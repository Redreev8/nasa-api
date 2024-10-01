'use client'
import { FC } from 'react'
import style from './container-img-days.module.scss'
import ImgDay from "@/components/img-day"
import ScrollBar from "@/ui/scroll-bar"
import { NasaData } from '@/api/nasa/day'
import Btn from '@/ui/btn'
import useContainerImgDays from './useContainerImgDays'

export interface ContainerImgDaysProps {
    data: NasaData[]
	date: Date
}

const ContainerImgDays: FC<ContainerImgDaysProps> = ({ data, date }) => {
	const { scroll, ref, handelClick, handelTransitionEnd } = useContainerImgDays({ data, date })
    return (
		<ScrollBar onTransitionEnd={ handelTransitionEnd } valueScrool={ 2400 } initScroll={ scroll } ref={ ref } className={ style['scroll-bar-x'] }>
			{
				data.map(el => (
					<ImgDay title={ el.title } copy={ el.copyright } date={ el.date } src={ el.url } alt={ el.copyright } key={ el.date }>
						{ el.explanation }
					</ImgDay>
				))
			}
			<Btn onClick={handelClick}>
				next
			</Btn>
		</ScrollBar>
    )
}

export default ContainerImgDays