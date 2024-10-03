import { FC } from 'react'
import style from './calendary.module.scss'
import Btn from '../btn'
import classNames from 'classnames'
import { DayObj } from '@/helper/get-days-moth'
import { ButtonProps } from '../btn/btn'

export interface CalendaryBtnProps extends ButtonProps {
    month: number
    day: DayObj
}

const CalendaryBtn: FC<CalendaryBtnProps> = ({ children, className, month, day, ...props }) => {
  return <Btn 
            {  ...props }
            className={classNames(style.btn, className, {
                [style.prew]: month !== day.month
            }) 
        }>
        <span className={ style.content }>
            <span className={ style.day }>{ day.day }</span>
            { children }
        </span>
    </Btn>
}

export default CalendaryBtn