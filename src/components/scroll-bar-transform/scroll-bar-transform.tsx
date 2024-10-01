'use client'
import { FC, LegacyRef, useEffect, useRef, useState } from 'react'
import style from './scroll-bar-transform.module.scss'
import ScrollBar from '@/ui/scroll-bar'
import classNames from 'classnames'
import useInVisibilityWindow from '@/hook/useInVisibilityWindow'
export interface ScrollBarTransformProps {
    children: (JSX.Element | null)[]
}

const ScrollBarTransform: FC<ScrollBarTransformProps> = ({ children }) => {
    const refScrollBar= useRef<HTMLDivElement>(null)
    const refWrapp= useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState(0)
    const inVisibility = useInVisibilityWindow<HTMLDivElement>({ set: setScroll})
    
    useEffect(() => {
        inVisibility(refWrapp.current!)
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
            <div ref={ refWrapp as LegacyRef<HTMLDivElement> | undefined } className={ style['wrapp'] }>
                { children }
            </div>
        </ScrollBar>
    )
}

export default ScrollBarTransform