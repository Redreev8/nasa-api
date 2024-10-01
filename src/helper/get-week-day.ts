export interface GetWeekDayProps {
    day: number
	month: number
	year: number
    currentDateNext?: Date
    currentDatePrev?: Date
	isNext?: boolean
	isPrev?: boolean
}

export default ({ day = 1, month, year, isNext = true, isPrev = true, currentDatePrev, currentDateNext }: GetWeekDayProps): Date[] => {
    const date = new Date(year, month, day, 10, 6)
    const days: Date[] = [new Date(date.getFullYear(), date.getMonth(), date.getDate())]
    let i = 1
    if (isPrev) {
        while(days[0].getDay() !== 1) {
            if (currentDatePrev && currentDatePrev < date) {
                break
            }
            
            date.setDate(date.getDate() - 1)
            i++
            days.unshift(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        }
        date.setDate(date.getDate() + i - 1)
    }
    if (isNext) {
        
        while(days[days.length - 1].getDay() !== 0) {
            if (
                currentDateNext && 
                (currentDateNext.getTime() - days[days.length - 1].getTime()) / (24 * 60 * 60 * 1000) < 1
            ) {
                break;
            }
            date.setDate(date.getDate() + 1)
            days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        }
    }
    return days
}