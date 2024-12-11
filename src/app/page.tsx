'use server'
import ContainerImgDays from '@/components/container-img-days'
import ScrollBarTransform from '@/components/scroll-bar-transform'
import weekControler from '@/controller/weeks.controlers'
import getCurrentDate from '@/helper/getCurrentDate'

export interface HompeProps {
	searchParams: {
		date?: string,
	}, 
}
const Home = async ({ searchParams }: HompeProps) => {
	const date = await getCurrentDate(searchParams.date)
	const dayWeekNumber = date.getDay() === 0 ? 6 : date.getDay() - 1
	const nextWeek = new Date(date.getTime() + ((7 - dayWeekNumber) * 24 * 60 * 60 * 1000))
	let dataWeeks = []	
	dataWeeks = await Promise.all([
		new Promise(resolve => resolve(weekControler(nextWeek))),
		new Promise(resolve => resolve(weekControler(date))),
	])
	
	return (
		<ScrollBarTransform>
			{
				[...dataWeeks].map((el, i) => {
					if (Array.isArray(el)) return <ContainerImgDays isActive={ i===1 } date={ date } data={ el.reverse() } key={ el[0].date } />
					return null
				})
			}
		</ScrollBarTransform>
	)
}

export default Home