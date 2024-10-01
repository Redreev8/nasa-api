export interface DayObj {
    day: number
    weekDay: number
    month: number
    year: number
    week: number
}

export interface PropsGetDaysMoth<T = DayObj> {
    day?: number,
    year: number,
    month: number,
    maxDay?: number,
    push?: (days: T[], data: DayObj) => void,
    template?: (props: DayObj) => any,
}

export interface Data<T = DayObj> {
    days: T[],
    week: DayObj['week'],
}

const getDaysMoth = <T = DayObj>({ 
    day = 1, 
    year, 
    month,
    maxDay = 31,
    push = (days, data) => { days.push(data as T) },
    template = ({ day }) => day,
}: PropsGetDaysMoth<T>): Data<T> => {
    const days: T[] = []
    const date = new Date(year, month, day)
    let week = 0
    let numberDays = 0
    while (date.getMonth() === month && maxDay > numberDays) {
        numberDays += 1
        const day = date.getDate()
        const weekDay = date.getDay()
        const props = {
            day,
            weekDay,
            month,
            year,
            week
        }
        const obj = template(props)
        push(days, obj)
        date.setDate(day + 1);
        week += weekDay ? 0 : 1
    }
    
    
    return {
        days,
        week,
    }
}

export default getDaysMoth