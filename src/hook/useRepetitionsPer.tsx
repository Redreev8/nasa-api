import debounce from '@/helper/debounce'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'


type Return = [number, Dispatch<SetStateAction<number>>]

const useRepetitionsPer = (ms: number): Return => {
    const [counter, setCounter] = useState<number>(0)
    const handelSetCounter = debounce(() => setCounter(prev => {
        if (prev === 0) return 0
        return prev - 1
    }), ms)
    const subtract = () => {
        if (counter === 0) return
        handelSetCounter()
    }

    useEffect(() => {
        subtract()
    }, [counter])
    return [counter, setCounter]
}

export default useRepetitionsPer