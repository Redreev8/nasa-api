'use client'
import { FC } from 'react'
import style from './text-background.module.scss'
import classNames from 'classnames'
import useTextBackground from './useTextBackground'
export interface TextBackgroundProps {
    children: string
    classNameContent?: string
}

const TextBackground: FC<TextBackgroundProps> = ({ children, classNameContent ='' }) => {
    const { ref, content } = useTextBackground(children)
    return (
        <span ref={ ref } className={ classNames(style['text-background'], { [classNameContent]:  content.length > 0}) }>
            { content.length > 0 ? content : children }
        </span>
    )
}

export default TextBackground