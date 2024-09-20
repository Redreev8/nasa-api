import { AreaHTMLAttributes, FC, ReactNode } from 'react'
import style from './paragraf.module.scss'
import classNames from 'classnames'
export interface ParagrafProps extends AreaHTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
}

const Paragraf: FC<ParagrafProps> = ({ children, className, ...props }) => {
    return (
        <p className={ classNames(style['paragraf'], className) } { ...props }>
            { children }
        </p>
    )
}

export default Paragraf