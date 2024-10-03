import { FC } from 'react'
import style from './menu.module.scss'
import classNames from 'classnames'
import MenuItemCalendary from '../menu-item-calendary'
export interface MenuProps {
}

const Menu: FC<MenuProps> = ({}) => {
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