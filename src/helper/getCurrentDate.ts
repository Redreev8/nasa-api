const getCurrentDate = async (dateStr?: string) => {
	if (!dateStr) return new Date()
	const currentDateArr = dateStr.split('-')
	return new Date(+currentDateArr[0], +currentDateArr[1]-1, +currentDateArr[2])
}

export default getCurrentDate