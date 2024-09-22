import { FC } from 'react'
import style from './img-day.module.scss'
import Paragraf from "@/ui/paragraf"
import Title from "@/ui/title"
import TextBackground from "@/ui/text-background"
import Img from '@/type/img'
export interface ImgDayProps extends Img {
    title: string
    children: string
	copy: string
	date: string
}

const ImgDay: FC<ImgDayProps> = ({ title, children, date, src, copy, alt }) => {
    return (
		<div className={ style['card'] }>
			<img className={ style['img'] } src={ src } alt={ alt } />
			<Title className={ style['title'] } level={2} levelTag={2}>
				<TextBackground>{ title }</TextBackground>
			</Title>
			<Paragraf className={ style['text'] }>
				<TextBackground classNameContent={ style['text__wrapp'] }>
					{ children }
				</TextBackground>
			</Paragraf>
			<span>
				<TextBackground classNameContent={ style['text__wrapp'] }>
					{ `${date}` }
				</TextBackground>
				<address>
					<TextBackground classNameContent={ style['text__wrapp'] }>
						{ `${copy}` }
					</TextBackground>
				</address>
			</span>
		</div>
    )
}

export default ImgDay