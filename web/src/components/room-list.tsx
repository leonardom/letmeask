import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRooms } from '@/http/use-rooms'
import { RoomItem } from './room-item'

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rooms</CardTitle>
        <CardDescription>Quick access to recent created rooms</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}
        {data?.map((room) => {
          return (
            <RoomItem key={room.id} room={room} />
          )
        })}
      </CardContent>
    </Card>
  )
}
