import getDaysMoth, { DayObj, PropsGetDaysMoth } from './get-days-moth';

export interface PropsGetDaysWeek<T = DayObj> extends  Omit<PropsGetDaysMoth<T>, 'push' | 'template'> {
    today?: Date
    isPrew?: boolean
    isNext?: boolean
    template?: <T>(props: DayObj) => T,
}

type DayWeek = DayObj[]

const getDaysWeek = ({ 
    day, 
    year, 
    month, 
    today = new Date(), 
    maxDay,
    isPrew,
    isNext,
    template
}: PropsGetDaysWeek) : DayWeek[] => {
    const data: { days: DayWeek[], week: number } = getDaysMoth<DayWeek>({
        day, 
        year, 
        month,
        maxDay,
        push: (days, data) => {
            if (data.weekDay === 1 || days.length === 0) {
                days.push([ data ])
            } else {
                days[data.week].push(data)
            }
            return days
        },
        template: template ? template : (data) => ({
            ...data,
            isToday: today.getDate() === data.day && 
                today.getMonth() === month && 
                today.getFullYear() === year,
        })
    })
    const { days } = data
    let { week } = data
    if (!days[0]) return [[]]
    if (week > days.length - 1) week = days.length - 1
    if (isPrew) {
        const prevYear = month < 0 ? year - 1 : year
        const prevStartDay = new Date(prevYear, month, 0).getDate() - (6 - days[0].length)
        const res = getDaysWeek({
            year: prevYear,
            month: month - 1 < 0 ? 11 : month - 1,
            day: prevStartDay,
            today,
            maxDay: 7 - days[0].length
        })
        days[0] = [
            ...res[0],
            ...days[0]
        ]
    }
    if (isNext) {
        const res = getDaysWeek({
            year: month === 11 ? year + 1 : year,
            month: month === 11 ? 0 : month + 1,
            today,
            maxDay: 7 - days[week].length
        })
        days[week] = [
            ...days[week],
            ...res[0],
        ]
    }
    
    return days
}

export default getDaysWeek