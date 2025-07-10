import { and, eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts'

export const createRoomQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body
      const embeddings = await generateEmbeddings(question)
      const embeddingsAsString = `[${embeddings.join(',')}]`
      
      const chunks = await db
        .select({
          id: schema.audioChucks.id,
          transcription: schema.audioChucks.transcription,
          similarity: sql<number>`(1 - (${schema.audioChucks.embeddings} <=> ${embeddingsAsString}::vector))`
        })
        .from(schema.audioChucks)
        .where(
          and(
            eq(schema.audioChucks.roomId, roomId),
            sql`(1 - (${schema.audioChucks.embeddings} <=> ${embeddingsAsString}::vector)) > 0.7`
          )
        )
        .orderBy(sql`${schema.audioChucks.embeddings} <=> ${embeddingsAsString}::vector`)
        .limit(3)

      let answer: string | null = null

      if (chunks.length > 0) {
        const transcriptions = chunks.map(chuck => chuck.transcription)
        answer = await generateAnswer(question, transcriptions)
      }

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
          answer,
        })
        .returning()

      const [created] = result

      if (!created) {
        throw new Error('Failed to create new question')
      }

      return reply.status(201).send({ 
        questionId: created.id,
        answer,
      })
    }
  )
}
