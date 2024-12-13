import { useState } from "react"

export type UseDateChageProps = {
    month?: number
    year?: number
}

const useDateChage = (props: UseDateChageProps = {}) => {
	const date = new Date()
    const [month, setMonth] = useState<number>(props.month ?? date.getMonth())
	const [year, setYear] = useState<number>(props.year ?? date.getFullYear())
	const setDate = (newMonth: number) => {
		setMonth(() => newMonth)
		console.log(newMonth);
		
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