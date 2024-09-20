import { FC, ReactNode } from 'react'
import style from './row.module.scss'
import classNames from 'classnames'
export interface RowProps {
    children: ReactNode
    g?: ('xl' | 'lg' | 'bg' | 'g' | 'md' | 'sm' | 'xs' | 'tiny')[]
}

const Row: FC<RowProps> = ({ children, g='g' }) => {
    return (
        <div className={ classNames(style['row'], style[`row--g-${g}`]) }>
            { children }
        </div>
    )
}

export default Row