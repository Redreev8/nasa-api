import { TouchEvent, useEffect, useRef, useState, WheelEvent } from 'react'
import { ScrollBarProps } from './scroll-bar'

const useScroll = ({ initScroll=0, onToScroll, os = 'X', valueScrool = 16 }: Omit<ScrollBarProps, 'onTransitionEnd'>) => {
    const refBar = useRef<HTMLDivElement>(null)
    const refWrapp = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState<number>(initScroll)
    const refTouch = useRef({
        prev: 0
    })
    const hendalScroll = ({ deltaY }: WheelEvent<HTMLDivElement>) => {
        if (valueScrool === 0) return
        toScroll(deltaY / 100)
    }
    const toScroll = (direction: number)=> {
        setScroll(prev => {
            let newValue = prev + (direction * valueScrool)
            const maxValue = refWrapp.current!.clientWidth - refBar.current!.clientWidth
            if (newValue < 0) newValue = 0
            if (newValue > maxValue) newValue = maxValue
            onToScroll && onToScroll({ direction, scroll: newValue, setScroll, maxValue })
            return newValue
        })
    }
    const hendalTouch = (e: TouchEvent<HTMLDivElement>) => {
        if (valueScrool === 0) return
        if(e.touches[0][`client${os}`] < refTouch.current.prev) toScroll(1)
        if(e.touches[0][`client${os}`] > refTouch.current.prev) toScroll(-1)
        refTouch.current.prev = e.touches[0][`client${os}`]
    }

    useEffect(() => {
        setScroll(initScroll)
    }, [initScroll])

    return {
        refBar,
        refWrapp,
        scroll,
        hendalScroll,
        hendalTouch
    }
}

export default useScroll