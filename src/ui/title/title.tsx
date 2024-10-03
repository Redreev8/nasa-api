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
    1: forwardRef<HTMLHeadingElement, TitleProps>(function H1Ref({ children, ...props }, ref) { return <h1 ref={ ref } { ...props }>{ children }</h1> }),
    2: forwardRef<HTMLHeadingElement, TitleProps>(function H2Ref({ children, ...props }, ref) { return <h2 ref={ ref } { ...props }>{ children }</h2> }),
    3: forwardRef<HTMLHeadingElement, TitleProps>(function H3Ref({ children, ...props }, ref) { return <h3 ref={ ref } { ...props }>{ children }</h3> }),
    4: forwardRef<HTMLHeadingElement, TitleProps>(function H4Ref({ children, ...props }, ref) { return <h4 ref={ ref } { ...props }>{ children }</h4> }),
    5: forwardRef<HTMLHeadingElement, TitleProps>(function H5Ref({ children, ...props }, ref) { return <h5 ref={ ref } { ...props }>{ children }</h5> }),
    6: forwardRef<HTMLHeadingElement, TitleProps>(function H6Ref({ children, ...props }, ref) { return <h6 ref={ ref } { ...props }>{ children }</h6> }),
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function TitleRef(
    { className, level=2, levelTag=level, children, ...props }, ref) {
        const cl = classNames(style.title, className, style[`title--${level}`])

        const Componet = levels[levelTag]
        return <Componet ref={ ref } className={ cl } { ...props }>
            { children }
        </Componet>
    }
)

export default Title