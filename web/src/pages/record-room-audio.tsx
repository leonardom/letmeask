import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type RoomParams = {
  roomId: string
}

const isRecodingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>()
  const [recording, setRecoding] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')
    const response = await fetch(
      `http://localhost:3333/rooms/${roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )
    const result = await response.json()
    // biome-ignore lint/suspicious/noConsole: temp
    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    try {
      recorder.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      })
      recorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          uploadAudio(event.data)
        }
      }
      recorder.current.onstart = (event) => {
        // biome-ignore lint/suspicious/noConsole: temp
        console.log('Recording stated: ', event)
      }
      recorder.current.onstop = (event) => {
        // biome-ignore lint/suspicious/noConsole: temp
        console.log('Recording stopped: ', event)
      }
      recorder.current.start()
    } catch (err) {
      alert(`Error: ${err}`)
    }
  }

  function stopRecording() {
    setRecoding(false)
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function startRecording() {
    if (!isRecodingSupported) {
      alert('Audio recorded not supported by your browser')
      return
    }
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })
    createRecorder(audio)
    setRecoding(true)
    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {recording ? (
        <Button onClick={stopRecording}>Pause Recording</Button>
      ) : (
        <Button onClick={startRecording}>Record Audio</Button>
      )}
      {recording ? <p>Recording...</p> : <p>Paused</p>}
    </div>
  )
}
