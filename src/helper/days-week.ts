export interface DaysWeek {
    [key: string]: {
        name: string,
        abbr: string,
        value: number
    }
}
  

const DaysWeek: DaysWeek = {
    MON: {
        name: 'Понедельник',
        abbr: 'MON',
        value: 1
    },
    TUE: {
        name: 'Вторник',
        abbr: 'TUE',
        value: 2
    },
    WED: {
        name: 'Среда',
        abbr: 'WED',
        value: 3
    },
    THU: {
        name: 'Четверг',
        abbr: 'THU',
        value: 4
    },
    FRI: {
        name: 'Пятница',
        abbr: 'FRI',
        value: 5
    },
    SAT: {
        name: 'Суббота',
        abbr: 'SAT',
        value: 6
    },
    SUN: {
        name: 'Воскресенье',
        abbr: 'SUN',
        value: 0
    },
}

export default DaysWeek