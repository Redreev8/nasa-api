import { AreaHTMLAttributes, Attributes, FC, ReactNode } from 'react'
import style from './col.module.scss'
import classNames from 'classnames'
export interface ColProps extends AreaHTMLAttributes<HTMLDivElement> {
    children: ReactNode
    g?: ('xl' | 'lg' | 'bg' | 'g' | 'md' | 'sm' | 'xs' | 'tiny')
}

const Col: FC<ColProps> = ({ children, g='g', className, ...props }) => {
    return (
        <div className={ classNames(style['col'], className) + ' ' + style[`col--g-${g}`] } { ...props }>
            { children }
        </div>
    )
}

export default Col