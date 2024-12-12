import { forwardRef, MouseEvent, ReactNode } from 'react'
import style from './calendary.module.scss'
import { PropsGetDaysWeek } from '@/helper/get-days-week-moth'
import Table from '../table'
import useCalendary from './useCalendary'
import classNames from 'classnames'
import { DayObj } from '@/helper/get-days-moth'
export interface CalendaryData {
    [key: number]: {
        [key: number]: {
            [key: number]: ReactNode
        }
    }
}
export interface CalendaryProps extends PropsGetDaysWeek {
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>, day: DayObj) => void 
    data?: CalendaryData
}

const Calendary = forwardRef<HTMLTableElement, CalendaryProps>(
    function CalendatyRef({ day = 1, month, year, data, maxDate, minDate, className, onClick }, ref) {
        const { ths, DataTable } = useCalendary({ day, month, year, data, maxDate, minDate,  maxDay: 0, onClick })

        return (
            <Table
                className={ classNames(className, style.table) }
                classNameTdBody={ style.td }
                ref={ ref }
                th={ ths() }
                data={ DataTable() }
            />
        )
    }
)

export default Calendary