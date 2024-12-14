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
            if (onToScroll) onToScroll({ direction, scroll: newValue, setScroll, maxValue })
            return newValue
        })
    }
    const handelTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        refTouch.current.prev = e.touches[0][`client${os}`]
    }
    const handelTouchEnd = () => {
        refTouch.current.prev = 0
    }
    const hendalTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (valueScrool === 0) return
        const scroll = (refTouch.current.prev - e.touches[0][`client${os}`]) / 1000
        if(e.touches[0][`client${os}`] < refTouch.current.prev) toScroll(scroll)
        if(e.touches[0][`client${os}`] > refTouch.current.prev) toScroll(scroll)
    }

    useEffect(() => {
        setScroll(initScroll)
    }, [initScroll])

    return {
        refBar,
        refWrapp,
        scroll,
        handelTouchStart,
        handelTouchEnd,
        hendalScroll,
        hendalTouchMove
    }
}

export default useScroll