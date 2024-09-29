'use client'
import { FC, useEffect, useRef, useState } from 'react'
import style from './scroll-bar-transform.module.scss'
import ScrollBar from '@/ui/scroll-bar'
import classNames from 'classnames'
import debounce from '@/helper/debounce'
export interface ScrollBarTransformProps {
    children: (JSX.Element | null)[]
}

const ScrollBarTransform: FC<ScrollBarTransformProps> = ({ children }) => {
    const refScrollBar= useRef<HTMLDivElement>(null)
    const refWrapp= useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState(0)
    
    const hen = () => {
        if (refWrapp.current!.children.length <= 2) return
        const childrens = [...refWrapp.current!.children]
        const rectFirstElement = childrens[0]!.getBoundingClientRect()
        if (rectFirstElement.top !== 0) {
            setScroll(0)
            debounce(hen, 500)()
            return 
        }
        setScroll(
            (refWrapp.current!.children.length - 2) * document.documentElement.clientHeight
        )
    }
    useEffect(() => {
        hen()
        return () => {
            setScroll(() => 0)
        }
    }, [children])
    return (
		<ScrollBar 
            os="Y"
            ref={ refScrollBar }
            initScroll={scroll} 
            valueScrool={0}
            className={ classNames({
                [style['scroll-bar']]: scroll !== 0
            }) }
        >
            <div ref={ refWrapp } className={ style['wrapp'] }>
                { children }
            </div>
        </ScrollBar>
    )
}

export default ScrollBarTransform