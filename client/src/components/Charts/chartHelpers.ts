export function culkSunPosition(sunrise: string, sunset: string, curtime: string): number {

    const sOnDay = 24 * 60 * 60;
    const allSteps = 96;
    
    const curtimeS = +curtime.split(':')[0] * 60 * 60 + +curtime.split(':')[1] * 60;
  
    const sunriseS = +sunrise.split(':')[0] * 60 * 60 + +sunrise.split(':')[1] * 60;
    const sunsetS = +sunset.split(':')[0] * 60 * 60 + +sunset.split(':')[1] * 60;
  
    const morningStep = sunriseS/allSteps*4
    const dayStep = (sunsetS - sunriseS)/allSteps*2;
    const nightStep = (sOnDay - sunsetS)/allSteps*4
    
  
    if (curtimeS >= sunsetS) {
        return Math.ceil(allSteps / 4 * 3 + (curtimeS - sunsetS) / nightStep);
    }
    if (curtimeS >= sunriseS) {
        return Math.floor(allSteps / 4 + (curtimeS - sunriseS) / dayStep);
    }
    return Math.round(curtimeS / morningStep);
  }

export function createSunImg() {
    let sun = document.createElement('img');
    if (document.documentElement.clientWidth <= 650) {
      sun.src = 'smallSun.svg';
    } else {
      sun.src = 'sun.svg';
    }
    return sun
}
  
export function sinusCalk() {
    let labels = []
    let sin = []
  
    const step = Math.PI / 48
    
    for (let i = -Math.PI / 2; i < 1.5*Math.PI; i+= step) {
        labels.push(''+i.toFixed(10));
        sin.push(Math.sin(i).toFixed(10));
    }
    
    return [labels, sin];
}

export function culkTrueNoon(offset: number, lon: number): string {
    const trueNoon = 12 + ((offset/3600) - lon / 15)
    return Math.floor(trueNoon) + ':' + (trueNoon % 1 * 0.6 * 100).toFixed()
}