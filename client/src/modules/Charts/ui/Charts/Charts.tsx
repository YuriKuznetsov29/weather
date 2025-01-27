import { Line, Chart } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Legend,
    BarController,
    BarElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import annotationPlugin from 'chartjs-plugin-annotation'
import chartConfigs from '../../constants/ChatsConfigs'
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { useEffect, useRef, useState } from 'react'
import Container from 'shared/ui/Container/Container'
import { getTimeWithUtcOffset } from 'helpers/transformData'
import { ChartData, ChartOptions } from 'chart.js'
import { createSunImg, calkSunPosition, calkTrueNoon, sinusCalk } from '../../helpers/chartHelpers'
import DayParameters from '../DayParameters/DayParameters'
import CurrentWind from '../CurrentWind/CurrentWind'

import styles from './Charts.module.scss'
import { currentWetherSelector, selectDay } from 'modules/Weather/store/selectors'

ChartJS.register(
    annotationPlugin,
    ChartDataLabels,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Legend,
    BarController,
    BarElement
)

const {
    tempChartConfig,
    windChartConfig,
    sunChartConfig,
    sunriseConfig,
    sunsetConfig,
    trueNoonConfig,
    horizontConfig,
} = chartConfigs()

ChartJS.defaults.color = '#000'
ChartJS.defaults.font.size = 16
ChartJS.defaults.plugins.datalabels!.align = 'end'

const Charts = () => {
    const [sunAdaptiveChart, setSunAdaptiveChart] = useState({})
    const [adaptiveChart, setAdaptiveChart] = useState({})

    const tempRef = useRef<ChartJS<'line', number[], string>>(null)
    const windRef = useRef<ChartJS>(null)
    const sunRef = useRef<ChartJS<'line', number[], string>>(null)

    const weather = useAppSelector(currentWetherSelector)
    const selectedDay = useAppSelector(selectDay)

    useEffect(() => {
        adaptiveCharts()
        updateCharts()
    }, [weather])

    function adaptiveCharts() {
        if (document.documentElement.clientWidth <= 650) {
            ChartJS.defaults.font.size = 10
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
            setSunAdaptiveChart({
                height: `${windowWidth * 0.5}px`,
                width: `${windowWidth - 30}px`,
            })
            setAdaptiveChart({ height: '300px', width: '800px' })
        }
    }

    const updateCharts = () => {
        if (weather) {
            const {
                dailyTime,
                dailyTemp,
                dailyWind,
                dailyWindDir,
                utcOffset,
                sunrise,
                sunset,
                lon,
            } = selectedDay === 'today' ? weather.currentWeather : weather.tomorrowWeather

            // temperature
            const tempChart = tempRef.current
            if (tempChart) {
                tempChartConfig.data.labels = dailyTime
                tempChartConfig.data.datasets[0].data = dailyTemp
                tempChart.data = tempChartConfig.data as ChartData<'line', number[], string>
                tempChart.update('active')
            } else {
                tempChartConfig.data.labels = dailyTime
                tempChartConfig.data.datasets[0].data = dailyTemp
            }

            //wind
            const avg = dailyWind.reduce((acc, cur) => acc + cur) / dailyWind.length
            const forMobile = document.documentElement.clientWidth <= 650
            const datasets = windChartConfig.data.datasets
            windChartConfig.data.labels = dailyTime
            datasets[0].data = dailyWind.map((el) => el + (forMobile ? avg * 0.35 : avg * 0.25))
            datasets[1].data = dailyWind
            windChartConfig.options.elements.point.rotation = dailyWindDir
            const windChart = windRef.current
            if (windChart) {
                windChart.data.datasets[1].datalabels!.anchor = 'end'

                windChart.data = windChartConfig.data
                windChart.update('active')
            }

            //sun
            if (selectedDay === 'today') {
                const { time } = getTimeWithUtcOffset(utcOffset)
                const [labels, sin] = sinusCalk()
                const sunPosition = calkSunPosition(sunrise, sunset, time)
                const sun = createSunImg()
                const trueNoon = calkTrueNoon(utcOffset, lon)
                const shift = sunPosition < 24 || sunPosition > 72 ? 2 : 0

                const sunDatasets = sunChartConfig.data.datasets

                sunriseConfig.label.content = sunrise
                sunsetConfig.label.content = sunset
                trueNoonConfig.label.content = trueNoon as string
                sunChartConfig.data.labels = labels
                ;(sunDatasets[0].data as string[]) = sin // sinus
                ;(sunDatasets[1].data as string[]) = sin.slice(0, sunPosition + 1)
                ;(sunDatasets[2].data as number[]) = new Array(labels.length).fill(0) // горизонт
                ;(sunDatasets[3].data as string[]) = sin
                    .map((el) => +el + 0.2 + '')
                    .slice(0, sunPosition + 1)
                if (sunPosition > 3) {
                    sunDatasets[3].pointStyle = []
                    sunDatasets[3].pointStyle[sunPosition - shift] = sun
                } else if (sunPosition <= 3) {
                    sunDatasets[3].pointStyle = []
                }
                const sunChart = sunRef.current
                if (sunChart) {
                    sunChart.data = sunChartConfig.data as ChartData<'line', number[], string>
                    sunChart.update('active')
                }
            }
        }
    }

    return (
        <div className={styles.charts}>
            <div className={styles.chart__inner}>
                <Container>
                    <>
                        <div className={styles.chartTitle}>Температура</div>
                        <div className={styles.chartWrapper}>
                            <div className={styles.chart_container} style={adaptiveChart}>
                                {weather ? (
                                    <Line
                                        ref={tempRef}
                                        data={tempChartConfig.data}
                                        options={tempChartConfig.options}
                                        redraw={true}
                                    />
                                ) : (
                                    <div className={styles.loadingChart}>
                                        <div className={styles.gradient}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                </Container>
            </div>
            <div className={styles.chart__inner}>
                <Container>
                    <>
                        <div className={styles.chartTitle}>Ветер</div>
                        <CurrentWind />
                        <div className={styles.chartWrapper}>
                            <div className={styles.chart_container} style={adaptiveChart}>
                                {weather ? (
                                    <Chart
                                        ref={windRef}
                                        type="bar"
                                        data={windChartConfig.data}
                                        options={windChartConfig.options}
                                        redraw={true}
                                    />
                                ) : (
                                    <div className={styles.loadingChart}>
                                        <div className={styles.gradient}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                </Container>
            </div>
            {selectedDay === 'today' && (
                <div className={styles.chart__inner}>
                    <Container>
                        <>
                            <div className={styles.chartTitle}>Рассвет и закат</div>
                            <div className={styles.chartWrapper}>
                                <div className={styles.sunChart_container} style={sunAdaptiveChart}>
                                    {weather ? (
                                        <>
                                            <Chart
                                                ref={sunRef}
                                                type="line"
                                                data={sunChartConfig.data as ChartData<'line'>}
                                                options={
                                                    sunChartConfig.options as unknown as ChartOptions<'line'>
                                                }
                                                redraw={true}
                                            />
                                        </>
                                    ) : (
                                        <div className={styles.loadingChart}>
                                            <div className={styles.gradient}></div>
                                        </div>
                                    )}
                                </div>
                                <DayParameters />
                            </div>
                        </>
                    </Container>
                </div>
            )}
        </div>
    )
}

export default Charts
