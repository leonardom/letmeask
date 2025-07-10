import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetQuestionsReponse,
} from './types/questions'

export function useCreateQuestionMutation(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ question }: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        }
      )
      const result: CreateQuestionResponse = await response.json()
      return result
    },
    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetQuestionsReponse>([
        'get-questions',
        roomId,
      ])
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        pending: true,
      }
      queryClient.setQueryData<GetQuestionsReponse>(
        ['get-questions', roomId],
        [newQuestion, ...(questions ?? [])]
      )

      return { newQuestion, questions }
    },
    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetQuestionsReponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetQuestionsReponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!(questions && context?.newQuestion)) {
            return questions
          }
          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return { ...question, id: data.questionId, answer: data.answer, pending: false }
            }
            return question
          })
        }
      )
    },
  })
}
