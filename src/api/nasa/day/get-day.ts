import getFilterUrl, { FiltersUrl } from '@/helper/filter-url'
import url, { NasaData } from './index'



export default async (optinal?: RequestInit, filtersUrl?: FiltersUrl): Promise<NasaData | string> => {
    'use server'
    try {
        const res = await fetch(url + (filtersUrl ? getFilterUrl(filtersUrl!, '&') : ''), optinal)
        return res.json()
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {        
            return err.message
        } 
        return 'error'
    }
}