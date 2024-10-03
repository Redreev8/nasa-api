'use client'
import { FC } from 'react'
import style from './menu-item-calendary.module.scss'
import classNames from 'classnames'
import Btn from '@/ui/btn'
import Calendary from '@/ui/calendary'
import useMenuItemCalendary from './useMenuItemCalendary'
import CalendaryTitle from '@/ui/calendary-title'
export interface MenuItemCalendaryProps {
}

const MenuItemCalendary: FC<MenuItemCalendaryProps> = ({}) => {
    const { data, month, year, changeDay, changeMonth } = useMenuItemCalendary()
    return (
        <div className={ classNames(style['menu-item-calendary']) }>
            <Btn isFilled className={ classNames(style['btn']) }>
                calendary
            </Btn>
            <div className={ style['calendary'] }>
                <CalendaryTitle
                    className={ style['calendary__title'] }
                    onClick={ changeMonth }
                    month={month}
                    year={year}
                />
                <Calendary
                    onClick={ changeDay }
                    data={data}
                    month={month}
                    year={year}
                />
            </div>
        </div>
    )
}

export default MenuItemCalendary