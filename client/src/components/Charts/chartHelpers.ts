export function culkSunPosition(sunrise: string, sunset: string, curtime: string): number {
    const sOnDay = 24 * 60 * 60
    const allSteps = 96
    
    const curtimeS = +curtime.split(':')[0] * 60 * 60 + +curtime.split(':')[1] * 60
  
    const sunriseS = +sunrise.split(':')[0] * 60 * 60 + +sunrise.split(':')[1] * 60
    const sunsetS = +sunset.split(':')[0] * 60 * 60 + +sunset.split(':')[1] * 60
  
    const morningStep = sunriseS/allSteps*4
    const dayStep = (sunsetS - sunriseS)/allSteps*2
    const nightStep = (sOnDay - sunsetS)/allSteps*4
  
    if (curtimeS >= sunsetS) {
        return Math.ceil(allSteps / 4 * 3 + (curtimeS - sunsetS) / nightStep)
    }
    if (curtimeS >= sunriseS) {
        return Math.floor(allSteps / 4 + (curtimeS - sunriseS) / dayStep)
    }
    return Math.round(curtimeS / morningStep)
  }

export function createSunImg() {
    let sun = document.createElement('img')
    if (document.documentElement.clientWidth <= 650) {
      sun.src = 'smallSun.svg'
    } else {
      sun.src = 'sun.svg'
    }
    return sun
}
  
export function sinusCalk() {
    let labels = []
    let sin = []
  
    const step = Math.PI / 48
    
    for (let i = -Math.PI / 2; i < 1.5*Math.PI; i+= step) {
        labels.push(''+i.toFixed(10))
        sin.push(Math.sin(i).toFixed(10))
    }
    
    return [labels, sin]
}

export function calkTrueNoon(offset: number, lon: number): string {
    const trueNoon = 12 + ((offset/3600) - lon / 15)
    return Math.floor(trueNoon) + ':' + (trueNoon % 1 * 0.6 * 100).toFixed()
}

export function calkDayDuration(sunrise: string, sunset: string, hour: number, minutes: string) {

    const sunsetHour = +sunset.slice(0, 2)
    const sunriseHour = +sunrise.slice(0, 2)
    const sunsetMin = +sunset.slice(3, 5)
    const sunriseMin = +sunrise.slice(3, 5)

    const hours = sunsetMin - sunriseMin < 0 ? sunsetHour - sunriseHour - 1 : sunsetHour - sunriseHour
    const min = sunsetMin - sunriseMin < 0 ? 60 - Math.abs(sunsetMin - sunriseMin) : sunsetMin - sunriseMin
    const beforeSunsetHour = sunsetMin - +minutes < 0 ? sunsetHour - hour - 1 : sunsetHour - hour
    const beforeSunsetMin = sunsetMin - +minutes < 0 ? 60 - Math.abs(sunsetMin - +minutes) : sunsetMin - +minutes

    return {hours, min, beforeSunsetHour, beforeSunsetMin}

}

export function checkTimesOfDay(sunrise: string, sunset: string, time: string): boolean {
    const sunriseMod = Number(sunrise.match(/[^:]/g)?.join(''))
    const sunsetMod = Number(sunset.match(/[^:]/g)?.join(''))
    const timeMod = Number(time.match(/[^:]/g)?.join(''))

    if (timeMod > sunriseMod && timeMod < sunsetMod) {
        return true
    }

    return false
}