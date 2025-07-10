export type Question = {
  id: string
  question: string
  answer: string | null
  createdAt: string
}

export type GetQuestionsReponse = Question[]

export type CreateQuestionRequest = {
  question: string
}

export type CreateQuestionResponse = {
  questionId: string
}
