'use server'
import { formatDateNasa, NasaData } from "@/api/nasa/day"
import getDay from "@/api/nasa/day/get-day"
import getWeekDay from "@/helper/get-week-day"

const WeekControler = async (date: Date): Promise<string | NasaData[]> => {

	if ((date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000) > 7) return ''
	const days = getWeekDay({
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
		currentDateNext: new Date()
	})
	const data = await getDay({}, {
		'start_date': formatDateNasa(days[0]),
		'end_date': formatDateNasa(days[days.length - 1]),
	})
	
    return data
}

export default  WeekControler