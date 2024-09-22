export interface NasaData {
    copyright: string
    date: string
    explanation: string
    hdurl: string
    media_type: string
    service_version: string
    title: string
    url: string
}

export const formatDateNasa = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

export default `https://api.nasa.gov/planetary/apod?api_key=${process.env.KEY}`
