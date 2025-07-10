import { useQuery } from '@tanstack/react-query'
import type { GetQuestionsReponse } from './types/questions'

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )
      const result: GetQuestionsReponse = await response.json()
      return result
    },
  })
}
