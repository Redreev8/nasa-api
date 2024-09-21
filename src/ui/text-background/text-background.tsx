'use client'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import style from './text-background.module.scss'
import classNames from 'classnames'
export interface TextBackgroundProps {
    children: string
    classNameContent?: string
}

const TextBackground: FC<TextBackgroundProps> = ({ children, classNameContent ='' }) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [content, setContent] = useState<JSX.Element[]>([])
    function spreflitLines() {
        if (!ref.current) return
        var spans = ref.current.children,
        top = 0,
        tmp: JSX.Element[] = [];
        let row: string = ''
        ref.current.innerHTML = children.replace(/\S+/g, '<n>$&</n>');
        for (let i = 0; i < spans.length; i++) {
            var rect = spans[i].getBoundingClientRect().top;
            if (top < rect && row.length > 0)  {
                tmp.push(<span className={ style['row'] }>{ row }</span>)
                row = ''
            }
            top = rect;
            row += spans[i].textContent + ' ';
        }
        if (row.length > 0) tmp.push(<span className={ style['row'] }>{ row }</span>)
        ref.current.innerHTML = ''
        setContent(tmp)
    }
    useEffect(() => {
        if (ref.current) {
            spreflitLines()
        }
    }, [])
    return (
        <span ref={ ref } className={ classNames(style['text-background'], { [classNameContent]:  content.length > 0}) }>
            { content.length > 0 ? content : children }
        </span>
    )
}

export default TextBackground