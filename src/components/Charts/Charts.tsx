import { Line,  Chart } from "react-chartjs-2"
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement, ScriptableAndArrayOptions, PointOptions, ChartDataset, ChartTypeRegistry , Point} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import chartConfigs from "./ChatsConfigs";
import { useAppSelector } from "app/hooks";
import { currentWether, selectDay } from "app/selectors";
import { useEffect, useRef, useState } from "react"
import Container from "components/Container/Container";
import { getTimeWithUtcOffset } from "services/tranformData";
import { ChartData, ChartOptions } from "chart.js";
import styles from './Charts.module.scss'

ChartJS.register(annotationPlugin, ChartDataLabels, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement)

const {tempChartConfig, 
    windChartConfig, 
    sunChartConfig, 
    sunriseConfig,
    sunsetConfig,
    trueNoonConfig,
    horizontConfig} = chartConfigs()

ChartJS.defaults.color = '#000';
ChartJS.defaults.font.size = 16;
ChartJS.defaults.plugins.datalabels!.align = 'end';

function culkSunPosition(sunrise: string, sunset: string, curtime: string): number {

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

function createSunImg() {
    let sun = document.createElement('img');
    if (document.documentElement.clientWidth <= 650) {
      sun.src = 'smallSun.svg';
    } else {
      sun.src = 'sun.svg';
    }
    return sun
}
  
function sinusCalk() {
    let labels = []
    let sin = []
  
    const step = Math.PI / 48
    
    for (let i = -Math.PI / 2; i < 1.5*Math.PI; i+= step) {
        labels.push(''+i.toFixed(10));
        sin.push(Math.sin(i).toFixed(10));
    }
    
    return [labels, sin];
}

function culkTrueNoon(offset: number, lon: number): string {
    const trueNoon = 12 + ((offset/3600) - lon / 15)
    return Math.floor(trueNoon) + ':' + (trueNoon % 1 * 0.6 * 100).toFixed()
}



const Charts = () => {
    const [sunAdaptiveChart, setSunAdaptiveChart] = useState({})
    const [adaptiveChart, setAdaptiveChart] = useState({})

    const tempRef = useRef<ChartJS<"line", number[], string>>(null)
    const windRef = useRef<ChartJS>(null)
    const sunRef = useRef<ChartJS<"line", number[], string>>(null)

    const wether = useAppSelector(currentWether)
    const selectedDay = useAppSelector(selectDay)

    useEffect(() => {
        adaptiveCharts()
        updateCharts()
    }, [wether])

    function adaptiveCharts() {
        if (document.documentElement.clientWidth <= 650) {
        //   const chartContainer = root.querySelectorAll('.chart-container'),
        //         sunChartContainer = document.querySelector('.sunChart-container');
      
          ChartJS.defaults.font.size = 10;
          tempChartConfig.data.datasets[0].borderWidth = 1
          tempChartConfig.data.datasets[0].pointRadius = 2
          sunChartConfig.data.datasets[0].borderWidth = 1
          sunChartConfig.data.datasets[1].borderWidth = 1
          sunChartConfig.data.datasets[2].borderWidth = 1
          sunsetConfig.yMax = -1.2
          sunriseConfig.yMax = -1.2
          trueNoonConfig.yMax = -1.2
          horizontConfig.yMax = 0.3

          const windowWidth = document.documentElement.clientWidth
          setSunAdaptiveChart({height: `${windowWidth * 0.5}px`, width: `${windowWidth - 30}px`})
        //   sunChartContainer.style.cssText = `height:${windowWidth * 0.5}px; width: ${windowWidth - 30}px;`

          setAdaptiveChart({height: '300px', width: '800px'})
        //   chartContainer.forEach(el => {
        //     el.style.cssText = 'height:300px; width: 800px;'
        //   })
        }
    }

    const updateCharts = () => {
        if (wether) {
            const {dailyTime, dailyTemp, dailyWind, dailyWindDir, utcOffset, sunrise, sunset, lon} = wether.currentWeather
            // temperature
            tempChartConfig.data.labels = dailyTime
            tempChartConfig.data.datasets[0].data = dailyTemp
            const tempChart = tempRef.current
            if (tempChart) {
                tempChart.data.datasets[0].data = dailyTemp
                tempChart.update('active')
            } 
            
            //wind
            const datasets = windChartConfig.data.datasets
            windChartConfig.data.labels = dailyTime;
            datasets[0].data = dailyWind.map(el => el + 2.5);
            datasets[1].data = dailyWind;
            // datasets[1].datalabels.anchor = "end";
            // datasets[0].rotation = dailyWindDir
            windChartConfig.options.elements.point.rotation = dailyWindDir
            const windChart = windRef.current
            if (windChart) {
                // console.log(windChart.data.datasets[0].rotation as PointOptions)
                const chartDatasets = windChart.data.datasets
                chartDatasets[0].data = dailyWind.map(el => el + 2.5);
                // windChart.data.datasets[0].rotation as ScriptableAndArrayOptions<PointOptions> = dailyWindDir;
                // datasets[0].rotation = dailyWindDir
                chartDatasets[1].data = dailyWind;
                windChart.data.datasets[1].datalabels!.anchor = "end"
                windChart.update('active');

                // windChart.update();
            }

            //sun

            const {time} = getTimeWithUtcOffset(utcOffset)
            const [labels, sin] = sinusCalk()
            const sunPosition = culkSunPosition(sunrise, sunset, time)
            const sun = createSunImg()
            const trueNoon = culkTrueNoon(utcOffset, lon)
            const shift = sunPosition < 24  || sunPosition > 72 ? 2 : 0

            const sunDatasets = sunChartConfig.data.datasets

            sunriseConfig.label.content = sunrise
            sunsetConfig.label.content = sunset
            trueNoonConfig.label.content = trueNoon;
            sunChartConfig.data.labels = labels;
            ( sunDatasets[0].data as string [] ) = sin; // sinus
            ( sunDatasets[1].data as string [] ) = sin.slice(0, sunPosition + 1);
            ( sunDatasets[2].data as number[] ) = new Array(labels.length).fill(0); // горизонт
            ( sunDatasets[3].data as string[] ) = sin.map(el => +el + 0.20 + '').slice(0, sunPosition + 1)
            if (sunPosition > 1) {
                sunDatasets[3].pointStyle = [];
                sunDatasets[3].pointStyle[sunPosition - shift] = sun
            }
            const sunChart = sunRef.current
            if (sunChart) {
                sunChart.data = sunChartConfig.data as ChartData<"line", number[], string>
                sunChart.update()
            }
        }
    }

    return ( 
        <div className={styles.charts}>
            <div className={styles.chart__inner}>
            <Container>
                <>
                    <div className={styles.chartTitle}>Температура</div>
                    <div className={styles.chartWrapper} >
                        <div className={styles.chart_container} style={adaptiveChart}>
                            {   
                                wether ? 
                                <Line ref={tempRef} data={tempChartConfig.data} options={tempChartConfig.options}/> 
                                : <div className={styles.loadingChart}>
                                    <div className={styles.gradient}></div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            </Container>
            </div>
            <div className={styles.chart__inner}>
            <Container>
                <>
                    <div className={styles.chartTitle}>Ветер</div>
                    <div className={styles.chartWrapper}>
                        <div className={styles.chart_container} style={adaptiveChart}>
                            {   
                                wether ? 
                                <Chart ref={windRef} type='bar' data={windChartConfig.data} options={windChartConfig.options}/> 
                                : <div className={styles.loadingChart}>
                                    <div className={styles.gradient}></div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            </Container>
            </div>
            <div className={styles.chart__inner}>
            <Container>
                <>
                    <div className={styles.chartTitle}>Рассвет и закат</div>
                    <div className={styles.chartWrapper}>
                        <div className={styles.sunChart_container} style={sunAdaptiveChart}>
                            {   
                                wether ? 
                                <Chart ref={sunRef} type='line' data={sunChartConfig.data as ChartData<"line">} options={sunChartConfig.options as unknown as ChartOptions<"line">}/> 
                                : <div className={styles.loadingChart}>
                                    <div className={styles.gradient}></div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            </Container>
            </div>
            
        </div>
        
    )
}

export default Charts