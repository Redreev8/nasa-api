'use client'
import { FC, useRef, useState } from 'react'
import style from './container-img-days.module.scss'
import ImgDay from "@/components/img-day"
import ScrollBar from "@/ui/scroll-bar"
import { formatDateNasa, NasaData } from '@/api/nasa/day'
import { useRouter,  usePathname } from 'next/navigation'
import { PropsScroll } from '@/ui/scroll-bar/scroll-bar'
import Btn from '@/ui/btn'
export interface ContainerImgDaysProps {
    data: NasaData[]
	date: Date
}

const ContainerImgDays: FC<ContainerImgDaysProps> = ({ data, date }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [scroll, setScroll] = useState<number>(0)
	const router = useRouter()
    const pathname = usePathname()
	const nextData = () => `?date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	const handelScrollTransitionEnd = () => {
		date.setDate(date.getDate() - 7)
		router.push(pathname + nextData())
		ref.current?.removeEventListener('transitionend', handelScrollTransitionEnd)
		setScroll(0)
	}
	const handelColick = () => {
		setScroll(() => 20)
		ref.current?.addEventListener('transitionend', handelScrollTransitionEnd)
	}
    return (
		<ScrollBar valueScrool={ 2200 } initScroll={ scroll } ref={ ref } className={ style['scroll-bar-x'] }>
			{
				data.map(el => (
					<ImgDay title={ el.title } copy={ el.copyright } date={ el.date } src={ el.url } alt={ el.copyright } key={ el.date }>
						{ el.explanation }
					</ImgDay>
				))
			}
			<Btn onClick={handelColick}>
				next
			</Btn>
		</ScrollBar>
    )
}

export default ContainerImgDays