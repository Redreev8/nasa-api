import { forwardRef, ForwardRefExoticComponent, HtmlHTMLAttributes, ReactNode, RefAttributes } from 'react'
import style from './title.module.scss'
import classNames from 'classnames'
interface TitleProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
    level?: number
    levelTag?: number
    className?: string
}

interface Levels {
    [key: number]: ForwardRefExoticComponent<Omit<TitleProps, 'level'> & RefAttributes<HTMLHeadingElement>>
}

const levels: Levels = {
    1: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h1 ref={ ref } { ...props }>{ children }</h1>),
    2: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h2 ref={ ref } { ...props }>{ children }</h2>),
    3: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h3 ref={ ref } { ...props }>{ children }</h3>),
    4: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h4 ref={ ref } { ...props }>{ children }</h4>),
    5: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h5 ref={ ref } { ...props }>{ children }</h5>),
    6: forwardRef<HTMLHeadingElement, TitleProps>(({ children, ...props }, ref) => <h6 ref={ ref } { ...props }>{ children }</h6>),
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ className, level=2, levelTag=level, children, ...props }, ref) => {
    const cl = classNames(style.title, className, style[`title--${level}`])

    const Componet = levels[levelTag]
    return <Componet ref={ ref } className={ cl } { ...props }>
        { children }
    </Componet>
})

export default Title