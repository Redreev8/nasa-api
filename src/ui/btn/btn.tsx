'use client'
import style from './btn.module.scss'
import { forwardRef, ForwardedRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export interface Props {
    href?: string
    isFilled?: boolean
}

export type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>
export type LinkProps = Props & AnchorHTMLAttributes<HTMLAnchorElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => <button ref={ ref } { ...props }>{ children }</button>)
const A = forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, ref) => <a ref={ ref } { ...props }>{ children }</a>)


const Btn = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps | ButtonProps>(
({ className, children, href, isFilled, ...props }, ref) => {
    const cl = classNames(style.btn, className, {
        [style['filled']]: isFilled
    })
    if (href)  {
        return (
            <A { ...props as LinkProps } href={ href } ref={ (ref as ForwardedRef<HTMLAnchorElement>) } className={ cl }>
                { children }
            </A>
        )
    }
    return (
        <Button { ...props as ButtonProps } ref={ ref as ForwardedRef<HTMLButtonElement> } className={ cl }>
            { children }
        </Button>
    )
})

export default Btn