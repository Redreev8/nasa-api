export interface TypeFilter {
    [key: string]: (key: string, filter: string) => string
}
export interface FiltersUrl {
    [key: string]: string
}
export default (filters: FiltersUrl, str?: string): string => {
    if (typeof str === 'undefined') str = '?'
    const typeFilter: TypeFilter = {
        'string': (key: string, filter: string) => str += `&${key}=${filter}`
    }
    for (const key in filters) {
        const func = typeFilter[typeof filters[key]]
        if (!func) continue
        func(key, filters[key])
    }

    return str
}