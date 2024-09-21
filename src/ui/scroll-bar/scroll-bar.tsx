'use client'
import { AreaHTMLAttributes, FC, ReactNode, TouchEvent, useRef, useState, WheelEvent } from 'react'
import style from './scroll-bar.module.scss'
import classNames from 'classnames'
export interface ScrollBarProps extends AreaHTMLAttributes<HTMLDivElement> {
    children: ReactNode
    initScroll?: number
}

const ScrollBar: FC<ScrollBarProps> = ({ children, initScroll=200, className, ...props }) => {
    const refBar = useRef<HTMLDivElement>(null)
    const refWrapp = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState<number>(initScroll)
    const refTouch = useRef({
        prev: 0
    })
    const hendalScroll = ({ deltaY }: WheelEvent<HTMLDivElement>) => {
        toScroll(deltaY / -100)
    }
    const toScroll = (n: number)=> {
        setScroll(prev => {
            const newValue = prev + (n * 16)
            const maxValue = refWrapp.current!.clientWidth - refBar.current!.clientWidth
            if (newValue < 0) return 0
            if (newValue > maxValue) return maxValue
            return newValue
        })
    }
    const hendalTouch = (e: TouchEvent<HTMLDivElement>) => {
        if(e.touches[0].clientX < refTouch.current.prev) toScroll(1)
        if(e.touches[0].clientX > refTouch.current.prev) toScroll(-1)
        refTouch.current.prev = e.touches[0].clientX
    }
    return (
        <div ref={ refBar } onWheel={ hendalScroll } onTouchMove={hendalTouch} className={ classNames(style['scroll-bar'], className) } { ...props }>
            <div style={{ transform: `translateX(${-scroll}px)` }} ref={ refWrapp } className={ classNames(style['wrapp']) }>
                { children }
            </div>
        </div>
    )
}

export default ScrollBar