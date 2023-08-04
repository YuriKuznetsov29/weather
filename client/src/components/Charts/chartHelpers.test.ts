import { culkSunPosition, calkTrueNoon } from './chartHelpers'

describe('culkSunPosition', () => {
    test('корректное значение', () => {
        expect(culkSunPosition('03:00', '20:00', '12:00')).toBe(49)
    })
    test('верхняя граница', () => {
        expect(culkSunPosition('03:00', '20:00', '23:59')).toBe(96)
    })
    test('нижняя граница', () => {
        expect(culkSunPosition('03:00', '20:00', '00:00')).toBe(0)
    })
})

describe('calkTrueNoon', () => {
    test('корректное значение', () => {
        expect(calkTrueNoon(3600, 40)).toBe('10:20')
    })
})
