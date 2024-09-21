import React, { useEffect, useRef, useState } from 'react'
import style from './text-background.module.scss'

const useTextBackground = (children: string) => {
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
                tmp.push(<span key={ row + i } className={ style['row'] }>{ row }</span>)
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

    return {
        ref,
        content
    }
}

export default useTextBackground