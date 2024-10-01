import style from './calendary.module.scss'
import classnames from 'classnames'
import getDaysWeek from '../../helper/get-days-week-moth'
import { CalendaryProps } from './calendary'
import Btn from '../btn'

interface DaysWeek {
    [key: string]: {
        name: string,
        abbr: string,
        value: number
    }
}
  

const DaysWeek: DaysWeek = {
    MON: {
        name: 'Понедельник',
        abbr: 'ПН',
        value: 1
    },
    TUE: {
        name: 'Вторник',
        abbr: 'ВТ',
        value: 2
    },
    WED: {
        name: 'Среда',
        abbr: 'СР',
        value: 3
    },
    THU: {
        name: 'Четверг',
        abbr: 'ЧТ',
        value: 4
    },
    FRI: {
        name: 'Пятница',
        abbr: 'ПТ',
        value: 5
    },
    SAT: {
        name: 'Суббота',
        abbr: 'СБ',
        value: 6
    },
    SUN: {
        name: 'Воскресенье',
        abbr: 'ВС',
        value: 0
    },
}

const useCalendary = ({ data, day = 1, month, year, } : CalendaryProps) => {
    const getContent = (i: number, day: number) => {
        if (!data[`${i}`]) return        
        if (!data[`${i}`][`${day}`]) return
        return data[`${i}`][`${day}`]
    }
    const ths = () : string[] => {
        const ths: string[] = []
        for (const key in DaysWeek) {
            ths.push(DaysWeek[key].abbr)
        }
        return ths
    }

    const DataTable = () => {
        const weeks = getDaysWeek({ day, month, year, isNext: true, isPrew: true  })
        return weeks.map(week => week.map(day => (
            <Btn 
                className={classnames(style.btn, {
                    [style.prew]: month !== day.month
                }) 
            }>
                <span className={ style.content }>
                    <span className={ classnames(style.day) }>{ day.day }</span>
                    { getContent(day.month, day.day) }
                </span>
            </Btn>
        )))
    }  
    return {
        ths,
        DataTable
    }
}

export default useCalendary