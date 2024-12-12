'use client'
import { MouseEvent, useEffect, useState } from 'react'
import { useRouter,  usePathname, useSearchParams } from 'next/navigation'
import { CalendaryData } from '@/ui/calendary/calendary'
import getWeekDay from '@/helper/get-week-day'
import CalendaryBtn from '@/ui/calendary/calendary-btn'
import { DayObj } from '@/helper/get-days-moth'
import { formatDateNasa } from '@/api/nasa/day'

const useMenuItemCalendary = () => {
    const [data, setData] = useState<CalendaryData>({})
    const [date, setDate] = useState<Date>(new Date())
    const [month, setMonth] = useState<number>(new Date().getMonth())
	const [year, setYear] = useState<number>(new Date().getFullYear())
    const router = useRouter()
    const pathname = usePathname()
	const searchParams = useSearchParams()
    const dateSearchParams = searchParams.get('date')
    const changeDay = (e: MouseEvent<HTMLButtonElement>, day: DayObj) => {
        router.push(pathname +`?date=${formatDateNasa(day)}`)
    }
    const changeMonth = (newMonth: number) => {
		setMonth(() => newMonth)
		setYear(prev => {
			if (month === 0 && newMonth === 11) return prev -= 1
			if (month === 11 && newMonth === 0) return prev += 1
			return prev
		})
    }
    useEffect(() => {
        const week = getWeekDay({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            currentDateNext: new Date()
        })
        setData(() => week.reduce((obj: CalendaryData, el) => {
            if (!obj[el.getFullYear()]) obj[el.getFullYear()] = {}
            if (!obj[el.getFullYear()][`${el.getMonth()}`]) obj[el.getFullYear()][`${el.getMonth()}`] = {}
            obj[el.getFullYear()][`${el.getMonth()}`][el.getDate()] = (
                <CalendaryBtn
                    disabled
                    key={ `${el.getFullYear()}${el.getMonth()}${el.getDate()}` }
                    month={ date.getMonth() }
                    day={{
                        day: el.getDate(),
                        month: el.getMonth(),
                        year: el.getFullYear(),
                        weekDay: el.getDay(),
                        week: el.getDay(),
                        isHiden: true
                    }}
                >
                </CalendaryBtn>
            )
            return obj
        }, {}))
    }, [date, month, year])
    useEffect(() => {
		if (!dateSearchParams) {
            setDate(new Date())
            return 
		}
        const arrSearchParamsDate = dateSearchParams?.split('-').map(el => +el)
        setDate(new Date(arrSearchParamsDate[0], arrSearchParamsDate[1] - 1, arrSearchParamsDate[2]))
        setMonth(arrSearchParamsDate[1] - 1)
        setYear(arrSearchParamsDate[0])
    }, [dateSearchParams])
    return {
        month,
        year,
        data,
        changeDay,
        changeMonth
    }
}

export default useMenuItemCalendary