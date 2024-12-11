interface Format {
    'ferstUp': (s: string) => string
    'camelCase': (s: string) => string
    'PascalCase': (s: string) => string
}

const FormatWord = (s: string, key: keyof Format ) => {
    const format: Format = {
        'ferstUp': (s) => {
            const arrLEtter = s.split('')
            arrLEtter[0] = arrLEtter[0].toLocaleUpperCase() 
            return arrLEtter.join('')
        },
        'camelCase': (s) =>  {
            const arrWord = s.split('-')
            return arrWord.reduce((str, word, i) => {
                if (i === 0) return str
                str += format.ferstUp(word)
                return str
            }, '')
        },
        'PascalCase': (s) =>  {
            const arrWord = s.split('-')
            return arrWord.reduce((str, word, i) => {
                str += format.ferstUp(word)
                return str
            }, '')
        }
    }

    return format[key](s) ?? s
}

export default FormatWord