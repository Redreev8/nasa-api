'use client'
import { AreaHTMLAttributes, Dispatch, forwardRef, SetStateAction, useEffect } from 'react'
import style from './scroll-bar.module.scss'
import classNames from 'classnames'
import useScroll from './useScroll'
export interface PropsScroll {
    direction: number
    scroll: number
    maxValue: number
    setScroll: Dispatch<SetStateAction<number>>
}
export interface ScrollBarProps {
    onToScroll?: (obj: PropsScroll) => void
    valueScrool?: number
    initScroll?: number
    os?: 'X' | 'Y'
}

const ScrollBar = forwardRef<HTMLDivElement | null, ScrollBarProps & AreaHTMLAttributes<HTMLDivElement>>(
    ({ children, initScroll=0, onToScroll, className, os = 'X', valueScrool = 16, ...props }, ref) => {
        const {
            refBar,
            refWrapp,
            scroll,
            hendalScroll,
            hendalTouch
        } = useScroll({ initScroll, onToScroll, os, valueScrool })
        useEffect(() => {
            if (typeof ref === 'function') {
                ref(refBar.current)
                return
            }
            
            if (typeof ref === 'object' && ref) {
                ref!.current = refBar!.current
                return
            }
        }, [])
        return (
            <div ref={ refBar } onWheel={ hendalScroll } onTouchMove={hendalTouch} className={ classNames(style['scroll-bar'], className) } { ...props }>
                <div style={{ transform: `translate${os}(${-scroll}px)` }} ref={ refWrapp } className={ classNames(style['wrapp']) }>
                    { children }
                </div>
            </div>
        )
    }    
)
export default ScrollBar