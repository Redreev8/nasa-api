export interface DayObj {
    day: number
    weekDay: number
    month: number
    year: number
    week: number
    isHiden: boolean
}

export interface PropsGetDaysMoth<T = DayObj> {
    day?: number,
    year: number,
    month: number,
    maxDay?: number,
    maxDate?: [number, number, number], 
    minDate?: [number, number, number],
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
    maxDate,
    minDate,
    maxDay = 31,
    push = (days, data) => { days.push(data as T) },
    template = ({ day }) => day,
}: PropsGetDaysMoth<T>): Data<T> => {
    const days: T[] = []
    const date = new Date(year, month, day)
    let week = 0
    let numberDays = 0
    console.log('====');
    console.log(year);
    console.log(maxDate);
    console.log(maxDate && 
        maxDate[0] <= date.getDate() &&
        maxDate[1] <=  date.getMonth() &&
        maxDate[2] <=  date.getFullYear());
    
    while (date.getMonth() === month && maxDay > numberDays) {
        numberDays += 1
        const day = date.getDate()
        const weekDay = date.getDay()
        const props = {
            day,
            weekDay,
            month,
            year,
            week,
            isHiden: false
        }
        if (
            (maxDate && 
            ((maxDate[0] < date.getDate() && maxDate[1] <= date.getMonth() && maxDate[2] >= date.getFullYear()) ||
            (maxDate[2] < date.getFullYear()))
            ) ||
            (minDate && 
            ((minDate[0] > date.getDate() && minDate[1] >= date.getMonth() && minDate[2] <= date.getFullYear()) ||
            (minDate[2] > date.getFullYear()))
            )
        ) {
            props.isHiden = true
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