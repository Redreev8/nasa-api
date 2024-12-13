'use client'
import { FC } from 'react'
import style from './calendary-title.module.scss'
import classNames from 'classnames'
import Title from '../title'
import Btn from '../btn'
import nameMonth from '@/helper/name-month'
import { PropsGetDaysMoth } from '@/helper/get-days-moth'

interface CalendaryTitleProps extends Omit<PropsGetDaysMoth, 'day' | 'push' | 'template'  | 'maxDay' | 'maxDate' | 'minDate'> {
    className?: string
    maxDate?: [number, number]
    minDate?: [number, number]
    onClick: (month: number) => void
}

const CalendaryTitle: FC<CalendaryTitleProps> = ({ month, year, onClick, className, maxDate, minDate }) => {
    const getNewMonth = (n: 1 | -1) => {
        let newMonth = month + n
        if (n > 0 && newMonth === 12) newMonth = 0
        if (n < 0 && newMonth === -1) newMonth = 11

        if (n > 0 && maxDate && newMonth === maxDate[0] && year + n === maxDate[1]) {
            return
        }
        if (minDate && newMonth === minDate[0] && year - n === minDate[1]) {
            return
        }
        return newMonth
    }
    const nextMonth = getNewMonth(1)
    const prevMonth = getNewMonth(-1)
    return (
        <div className={ classNames(style['calendary-title'], className) }>
            <Title level={5} levelTag={6} className={ style['calendary-title__moth'] }>{ nameMonth[month] } {year}</Title>
			{
                 typeof prevMonth === 'number' ? (
                    <Btn className={ style['calendary-title__btn'] } onClick={ () => onClick(prevMonth) }>{ nameMonth[prevMonth] }</Btn>
                ) : <div className={ style['calendary-title__btn'] } aria-hidden/>
            }
			{
                typeof nextMonth === 'number' ? (
                    <Btn className={ style['calendary-title__btn'] } onClick={ () => onClick(nextMonth) }>{ nameMonth[nextMonth] }</Btn>
                ) : <div className={ style['calendary-title__btn'] } aria-hidden/>
            }
        </div>
    )
}

export default CalendaryTitle