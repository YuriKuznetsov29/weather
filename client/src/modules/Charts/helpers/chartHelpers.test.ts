import { calkSunPosition, calkTrueNoon, calkDayDuration, checkTimesOfDay } from './chartHelpers'

describe('calkSunPosition', () => {
    test('корректное значение', () => {
        expect(calkSunPosition('03:00', '20:00', '12:00')).toBe(49)
    })
    test('верхняя граница', () => {
        expect(calkSunPosition('03:00', '20:00', '23:59')).toBe(96)
    })
    test('нижняя граница', () => {
        expect(calkSunPosition('03:00', '20:00', '00:00')).toBe(0)
    })
})

describe('calkTrueNoon', () => {
    test('корректное значение', () => {
        expect(calkTrueNoon(3600, 40)).toBe('10:20')
    })
})

describe('calkDayDuration', () => {
    test('корректное значение', () => {
        const result = { hours: 14, min: 0, beforeSunsetHour: 13, beforeSunsetMin: 12 }
        expect(calkDayDuration('04:00', '18:00', 4, '48')).toEqual(result)
    })
})

describe('checkTimesOfDay', () => {
    test('корректное значение', () => {
        expect(checkTimesOfDay('04:00', '18:00', '12:00')).toBe(true)
    })
    test('нижняя граница', () => {
        expect(checkTimesOfDay('04:00', '18:00', '04:00')).toBe(false)
    })
    test('верхняя граница', () => {
        expect(checkTimesOfDay('04:00', '18:00', '18:00')).toBe(false)
    })
})
