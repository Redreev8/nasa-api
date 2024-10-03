import { FC } from 'react'
import style from './header.module.scss'
import classNames from 'classnames'
import Menu from '../menu'
const Header: FC = ({}) => {
    return (
        <header className={ classNames(style['header']) }>
            <Menu/>
        </header>
    )
}

export default Header