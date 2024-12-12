import getDaysWeek from '../../helper/get-days-week-moth'
import { CalendaryProps } from './calendary'
import CalendaryBtn from './calendary-btn'
import { TableProps } from '../table/table'
import DaysWeek from '@/helper/days-week'

const useCalendary = ({ data, day = 1, month, year, maxDate, minDate, onClick } : CalendaryProps) => {
    const getContent = (year: number, month: number, day: number) => {
        if (!data) return
        if (!data[`${year}`]) return        
        if (!data[`${year}`][`${month}`]) return
        return data[`${year}`][`${month}`][`${day}`]
    }
    const ths = () : TableProps['th'] => {
        const ths: TableProps['th'] = [[]]

        for (const key in DaysWeek) {
            ths[0].push(DaysWeek[key].abbr)
        }
        return ths
    }
    
    const DataTable = () => {
        const weeks = getDaysWeek({ day, month, year, maxDate, minDate, isNext: true, isPrew: true  })
        return weeks.map(week => week.map(day => {
            if (day.isHiden) return
            return (
                getContent(day.year, day.month, day.day) ?? (
                    <CalendaryBtn
                        onClick={ (e) => onClick && onClick(e, day) }
                        month={ month }
                        day={ day }
                        key={ `${day.year}${day.month}${day.day}` }
                    >
                    </CalendaryBtn>
                )
            )
        }))
    }  
    return {
        ths,
        DataTable
    }
}

export default useCalendary