import { forwardRef, ReactNode } from 'react'
import { PropsGetDaysWeek } from '../../helper/get-days-week-moth'
import Table from '../table'
import useCalendary from './useCalendary'

export interface CalendaryProps extends PropsGetDaysWeek {
    data: {
        [key: number]: {
            [key: number]: ReactNode
        }
    }
}

const Calendary = forwardRef<HTMLTableElement, CalendaryProps>(({ day = 1, month, year, data }, ref) => {
    const { ths, DataTable } = useCalendary({ day, month, year, data })

    return (
        <Table
            ref={ ref }
            th={ ths() }
            data={ DataTable() }
        />
    )
})

export default Calendary