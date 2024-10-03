import { useState } from "react"

const DATE = new Date()

export type UseDateChageProps = {
    month?: number
    year?: number
}

const useDateChage = (props: UseDateChageProps = {}) => {
    const [month, setMonth] = useState<number>(props.month ?? DATE.getMonth())
	const [year, setYear] = useState<number>(props.year ?? DATE.getFullYear())
	const setDate = (newMonth: number) => {
		setMonth(() => newMonth)
		setYear(prev => {
			if (month === 0 && newMonth === 11) return prev -= 1
			if (month === 11 && newMonth === 0) return prev += 1
			return prev
		})
	}

    return {
        month,
        year,
        setDate,
    }
}

export default useDateChage