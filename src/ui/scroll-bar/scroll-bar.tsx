'use client'
import { AreaHTMLAttributes, FC, ReactNode, TouchEvent, useRef, useState, WheelEvent } from 'react'
import style from './scroll-bar.module.scss'
import classNames from 'classnames'
export interface ScrollBarProps {
    onToScroll?: (obj: {
        direction: number
        scroll: number
        maxValue: number
    }) => void
    valueScrool?: number
    initScroll?: number
    os?: 'X' | 'Y'
}

const ScrollBar: FC<ScrollBarProps & AreaHTMLAttributes<HTMLDivElement>> = 
({ children, initScroll=0, onToScroll, className, os = 'X', valueScrool = 16, ...props }) => {
    const refBar = useRef<HTMLDivElement>(null)
    const refWrapp = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState<number>(initScroll)
    const refTouch = useRef({
        prev: 0
    })
    const hendalScroll = ({ deltaY }: WheelEvent<HTMLDivElement>) => {
        toScroll(deltaY / 100)
    }
    const toScroll = (direction: number)=> {
        setScroll(prev => {
            let newValue = prev + (direction * valueScrool)
            const maxValue = refWrapp.current!.clientWidth - refBar.current!.clientWidth
            if (newValue < 0) newValue = 0
            if (newValue > maxValue) newValue = maxValue
            onToScroll && onToScroll({ direction, scroll: newValue, maxValue })
            return newValue
        })
    }
    const hendalTouch = (e: TouchEvent<HTMLDivElement>) => {
        if(e.touches[0][`client${os}`] < refTouch.current.prev) toScroll(1)
        if(e.touches[0][`client${os}`] > refTouch.current.prev) toScroll(-1)
        refTouch.current.prev = e.touches[0][`client${os}`]
    }
    return (
        <div ref={ refBar } onWheel={ hendalScroll } onTouchMove={hendalTouch} className={ classNames(style['scroll-bar'], className) } { ...props }>
            <div style={{ transform: `translate${os}(${-scroll}px)` }} ref={ refWrapp } className={ classNames(style['wrapp']) }>
                { children }
            </div>
        </div>
    )
}

export default ScrollBar