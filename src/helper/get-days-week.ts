import { DayObj } from './get-days-moth'

const getWeekDay = ({ day = 1, month, year }: Omit<DayObj, 'weekDay' | 'week'>): DayObj[] => {
    const date = new Date(year, month, day)
    const days: DayObj[] = [{
        day: day,
        month: date.getMonth(),
        year: date.getFullYear(),
        weekDay: date.getDay(),
        week: 0,
        isHiden: false
    }]
    let i = 1
    
    while(days[0].weekDay !== 1) {
        date.setDate(date.getDate() - 1)
        days.unshift({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            weekDay: date.getDay(),
            week: 0,
            isHiden: false 
        })
        i++
    }
    date.setDate(date.getDate() + i - 1)
    while(days[days.length - 1].weekDay !== 0) {
        date.setDate(date.getDate() + 1)
        days.push({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            weekDay: date.getDay(),
            week: 0,
            isHiden: false 
        })
    }

    return days
}

export default getWeekDay