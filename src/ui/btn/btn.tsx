'use client'
import style from './btn.module.scss'
import { forwardRef, ReactNode, ForwardedRef } from 'react'
import classNames from 'classnames'

export interface Props {
    href?: string
    className?: string
    children?: ReactNode
    onClick: () => void
}

const Button = forwardRef<HTMLButtonElement, Omit<Props, 'href'>>(({ children, ...props }, ref) => <button ref={ ref } { ...props }>{ children }</button>)
const A = forwardRef<HTMLAnchorElement, Props>(({ children, ...props }, ref) => <a ref={ ref } { ...props }>{ children }</a>)


const Btn= forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
({ className, children, href, ...props }, ref) => {
    const cl = classNames(style.btn, className, {})
    if (href)  {
        return (
            <A { ...props } href={ href } ref={ (ref as ForwardedRef<HTMLAnchorElement>) } className={ cl }>
                { children }
            </A>
        )
    }
    return (
        <Button { ...props } ref={ ref as ForwardedRef<HTMLButtonElement> } className={ cl }>
            { children }
        </Button>
    )
})

export default Btn