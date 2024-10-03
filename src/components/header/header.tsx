import { FC } from 'react'
import style from './header.module.scss'
import classNames from 'classnames'
import Menu from '../menu'
export interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <header className={ classNames(style['header']) }>
            <Menu/>
        </header>
    )
}

export default Header