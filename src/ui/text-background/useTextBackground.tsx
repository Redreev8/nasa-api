import { useEffect, useRef, useState } from 'react'
import style from './text-background.module.scss'

const useTextBackground = (children: string) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [content, setContent] = useState<JSX.Element[]>([])
    const spreflitLines = () => {
        if (!ref.current) return
        setContent(() => [])
        const spans = ref.current.children
        const tmp: JSX.Element[] = []
        let top = 0
        let row: string = ''
        ref.current.innerHTML = children.replace(/\S+/g, '<n>$&</n>');
        for (let i = 0; i < spans.length; i++) {
            const rect = spans[i].getBoundingClientRect().top;
            if (top < rect && row.length > 0)  {
                tmp.push(<span key={ row + i } className={ style['row'] }>{ row }</span>)
                row = ''
            }
            top = rect;
            row += spans[i].textContent + ' ';
        }
        if (row.length > 0) tmp.push(<span className={ style['row'] } key={row}>{ row }</span>)
        ref.current.innerHTML = ''
        setContent(() => tmp)
    }
    useEffect(() => {
        spreflitLines()
    }, [children])

    return {
        ref,
        content
    }
}

export default useTextBackground