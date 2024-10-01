import { TransitionEvent, useEffect, useRef, useState } from 'react'
import { ContainerImgDaysProps } from './container-img-days'
import { useRouter,  usePathname, useSearchParams } from 'next/navigation'
import { formatDateNasa } from '@/api/nasa/day'

const useContainerImgDays = ({ date }: ContainerImgDaysProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const [scroll, setScroll] = useState<number>(0)
	const [isRederect, setIsRederect] = useState<boolean>(false)
	const router = useRouter()
    const pathname = usePathname()
	const searchParams = useSearchParams()
	const handelTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
		if (!isRederect) return
		setScroll(() => 0)
		const target = e.target! as HTMLElement
		if (target.tagName === 'DIV' && scroll !== 0) return
		setIsRederect(() => false)
		const getDateSearchParams = searchParams.get('date')
		let date: Date
		if (!getDateSearchParams) {
			date = new Date()
		} else {
			const arrSearchParamsDate = getDateSearchParams?.split('-').map(el => +el)
			date = new Date(arrSearchParamsDate[0], arrSearchParamsDate[1] - 1, arrSearchParamsDate[2])
		}
		const indexMON = date.getDay() === 0 ? 0 : 7 - date.getDay()
		date.setDate((date.getDate() - 7) + indexMON)
		router.push(pathname +`?date=${formatDateNasa(date)}`)
	}
	const handelClick = () => {
		setIsRederect(true)
		setScroll(() => 1)
	}
	useEffect(() => {
		if (ref.current) {
			const index = date.getDay() === 0 ? 0 : 7 - date.getDay()
			const wrapp = ref.current.children[0]
			const currentImg = wrapp.children[index]
			if (!currentImg) return
			const { left } = currentImg.getBoundingClientRect()
			const maxWidth = wrapp.clientWidth - document.documentElement['clientWidth']
			const result = left > maxWidth ? maxWidth : left
			setScroll(() => result <= 0 ? 0 : result)
		}
	}, [date])

    return {
        handelClick,
        scroll,
        ref,
		handelTransitionEnd
    }
}

export default useContainerImgDays