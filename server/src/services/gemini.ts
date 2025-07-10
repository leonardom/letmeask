import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcribe the audio into English. Be accurate and natural in your transcription. Maintain proper punctuation and divide the text into paragraphs where appropriate.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error('It was not possible to transcribe the audio')
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('It was not possible generate embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')
  const prompt = `
    Using the text provided below as context, answer the question clearly and precisely.

    CONTEXT:
    ${context}

    QUESTION:
    ${question}

    INSTRUCTIONS:
    - Use only information contained in the context provided;
    - If the answer is not found in the context, simply respond that you do not have enough information to answer;
    - Be objective;
    - Maintain an educational and professional tone;
    - Cite excerpts from the context if appropriate;
    - If citing the context, use the term "class content";
  `.trim()
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('It was not possible generate answer')
  }

  return response.text
}
