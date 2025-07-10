import mockEmbeddings from './mock-embeddings.ts'

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({ text: 'mocked text' }),
      embedContent: vi.fn().mockResolvedValue(mockEmbeddings),
    },
  })),
}))

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import app from '../src/app.ts'

let roomId: string | null = null

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Room API', () => {
  it('GET /rooms -> should return status 200 and a list of rooms', async () => {
    const response = await request(app.server).get('/rooms')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    roomId = response.body[0].id
  })

  it('POST /rooms -> should return status 201 and json with roomId', async () => {
    const response = await request(app.server)
      .post('/rooms')
      .send({ name: 'New Room' })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('roomId')
  })

  it('GET /rooms/:roomId/questions -> should return 200 and list of questions', async () => {
    const response = await request(app.server).get(`/rooms/${roomId}/questions`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('POST /rooms/:roomId/questions -> should return 201 and json with questionId', async () => {
    const response = await request(app.server)
      .post(`/rooms/${roomId}/questions`)
      .send({ question: 'What is Fastify?' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('questionId')
    expect(response.body).toHaveProperty('answer')
  })
})
