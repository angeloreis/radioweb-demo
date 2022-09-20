import { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react'

import { IRadioStatePlayContext } from './types'

export const RadioPlayerContext = createContext<IRadioStatePlayContext>(
    {} as IRadioStatePlayContext
)

export const useRadioPlayedContext = () => useContext(RadioPlayerContext)

interface RadioStreamProps {
    children: ReactNode
}

export const RadioStreamProvider: FC<RadioStreamProps> = ({ children }: RadioStreamProps) => {
    const MUTE_VOLUME = 0
    const MIN_VOLUME = 0.10000000000000014
    const MAX_VOLUME = 1

    const [streaming, setStreaming] = useState<HTMLAudioElement>(
        {} as HTMLAudioElement
    )

    const [loading, setLoading] = useState<boolean>(false)
    const [played, setPlayed] = useState<boolean>(false)

    const handleStreaming = (url: string) => {
        setStreaming(new Audio(url))
    }

    const onStart = async () => {
        if (played) {
            alert('Você já possui uma transmissão acontecendo!')
            return
        }
        streaming.play()
        setPlayed(true)
    }

    const onStop = () => {
        if (!played) {
            alert('Nenhuma transmissão acontecendo!')
            return
        }
        streaming.pause()
        setPlayed(false)
    }

    const volumePlus = () => {
        if (streaming.volume == MAX_VOLUME) {
            alert('Você já está no volume máximo')
            return
        }
        if (streaming.volume > MAX_VOLUME) return
        if (streaming.volume == MUTE_VOLUME || streaming.volume <= MAX_VOLUME) streaming.volume += 0.1
    }

    const volumeMinus = () => {
        const volume = streaming.volume.toPrecision(1)
        if (Number(volume) < MIN_VOLUME) {
            alert('Você já está no volume mínimo')
            return
        }
        if (Number(volume) >= MUTE_VOLUME) streaming.volume -= 0.1
    }

    const muteAudio = () => {
        streaming.volume = MUTE_VOLUME
    }

    useEffect(() => {
        window.addEventListener('loadeddata', () => setLoading(true))

        return () => {
            window.removeEventListener('loadeddata', () => setLoading(false))
        }
    }, [])

    useEffect(() => setStreaming(new Audio('')), [])

    return (
        <RadioPlayerContext.Provider
            value={{
                played,
                loading,
                handleStreaming,
                streaming,
                onStart,
                onStop,
                volumePlus,
                volumeMinus,
                muteAudio
            }}>
            {children}
        </RadioPlayerContext.Provider>
    )
}