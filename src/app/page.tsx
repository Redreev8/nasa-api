'use server'
import ContainerImgDays from "@/components/container-img-days"
import ScrollBarTransform from "@/components/scroll-bar-transform"
import weekControler from "@/controller/weeks.controlers"
interface HompeProps {
	params: {},
	searchParams: {
		date?: string,
	}, 
}

export const getCurrentDate = (dateStr?: string) : Date => {
	if (!dateStr) return new Date()
	
	const currentDateArr = dateStr.split('-')
	return new Date(+currentDateArr[0], +currentDateArr[1]-1, +currentDateArr[2])
}


const Home = async ({ searchParams }: HompeProps) => {
	const date = await getCurrentDate(searchParams.date)
	const prevWeek = new Date(date.getTime() - (8 * 24 * 60 * 60 * 1000))
	const nextWeek = new Date(date.getTime() + (8 * 24 * 60 * 60 * 1000))
	let dataWeeks = []	
	dataWeeks = await Promise.all([
		new Promise(resolve => resolve(weekControler(nextWeek))),
		new Promise(resolve => resolve(weekControler(date))),
		new Promise(resolve => resolve(weekControler(prevWeek))),
	])
	return (
		<ScrollBarTransform>
			{
				[...dataWeeks].map(el => {
					console.log(true);
					
					if (Array.isArray(el)) return <ContainerImgDays date={ date } data={ el.reverse() } key={ el[0].date } />
					return null
				})
			}
		</ScrollBarTransform>
	)
}

export default Home