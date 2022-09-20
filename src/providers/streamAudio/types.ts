import { Dispatch } from 'react'

export interface IRadioStatePlayContext {
  played: boolean
  streaming: HTMLAudioElement
  loading: boolean
  handleStreaming: (url: string) => void
  onStart: () => void
  onStop: () => void
  volumePlus: () => void
  volumeMinus: () => void
  muteAudio: () => void
}