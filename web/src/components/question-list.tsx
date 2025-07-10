import { useRoomQuestions } from '@/http/use-room-questions'
import { QuestionItem } from './question-item'

type Props = {
  roomId: string
}

export function QuestionList({ roomId }: Props) {
  const { data } = useRoomQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Questions & Answeres
        </h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}
