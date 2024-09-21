import { FC } from 'react'
import style from './card-img-desc.module.css'
import Paragraf from "@/ui/paragraf";
import Title from "@/ui/title";
import TextBackground from "@/ui/text-background";
export interface CardImgDescProps {
}

const CardImgDesc: FC<CardImgDescProps> = ({}) => {
    return (
		<div className={ style['card'] }>
			<img className={ style['img'] } src="https://apod.nasa.gov/apod/image/2409/Mermaid_Corke_1080.jpg" alt="" />
			<Title className={ style['title'] } level={2} levelTag={2}>
				<TextBackground>The Mermaid Nebula Supernova Remnant</TextBackground>
			</Title>
			<Paragraf className={ style['text'] }>
				<TextBackground classNameContent={ style['text__wrapp'] }>
					New stars are born from the remnants of dead stars. The gaseous remnant of the gravitational 
					collapse and subsequent death of a very massive star in our Milky Way created the G296.5+10.0
					supernova remnant, of which the featured Mermaid Nebula is part. Also known as the Betta Fish
					Nebula, the Mermaid Nebula makes up part of an unusual subclass of supernova remnants that are
					two-sided and nearly circular. Originally discovered in X-rays, the filamentary nebula is a 
					frequently studied source also in radio and gamma-ray light. The blue color visible here originates
					from doubly ionized oxygen (OIII), while the deep red is emitted by hydrogen gas. The nebula's
					mermaid-like shape has proven to be useful for measurements of the interstellar magnetic field.
				</TextBackground>
			</Paragraf>
		</div>
    )
}

export default CardImgDesc