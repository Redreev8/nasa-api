import url, { NasaData } from './index'

export default async (optinal?: RequestInit): Promise<NasaData | string> => {
    'use server'
    try {
        
        const res = await fetch(url, optinal)
        return res.json()
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {        
            return err.message
        } 
        return 'error'
    }
}