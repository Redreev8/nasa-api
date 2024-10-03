import { FC } from 'react'
import style from './calendary-title.module.scss'
import classNames from 'classnames'
import Title from '../title'
import Btn from '../btn'
import nameMonth from '@/helper/name-month'
interface CalendaryTitleProps {
    month: number
    year: number
    className?: string
    onClick: (month: number) => void
}

const CalendaryTitle: FC<CalendaryTitleProps> = ({ month, year, onClick, className }) => {
    const nextMonth = month + 1 === 12 ? 0 : month + 1
    const prevMonth = month - 1 === -1 ? 11 : month - 1
    
    return (
        <div className={ classNames(style['calendary-title'], className) }>
            <Title level={5} levelTag={6} className={ style['calendary-title__moth'] }>{ nameMonth[month] } {year}</Title>
			<Btn className={ style['calendary-title__btn'] } onClick={ () => onClick(prevMonth) }>{ nameMonth[prevMonth] }</Btn>
			<Btn className={ style['calendary-title__btn'] } onClick={ () => onClick(nextMonth) }>{ nameMonth[nextMonth] }</Btn>
        </div>
    )
}

export default CalendaryTitle