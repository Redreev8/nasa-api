import { FC } from 'react'
import style from './menu.module.scss'
import classNames from 'classnames'
import MenuItemCalendary from '../menu-item-calendary'

const Menu: FC = () => {
    return (
        <nav className={ classNames(style['menu']) }>
            <div className={ style['wrapp'] }>
                <ul className={ style['list'] }>
                    <li>
                        <MenuItemCalendary/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu