export default (s: string, isFirst = true) => s.split('-').map((s, i) => {
    if (!isFirst && i === 0) return s
    s = s.trim()
    const arrName = s.split('') 
    arrName[0] = arrName[0].toLocaleUpperCase() 
    return arrName.join('')
}).join('')