import { Line, Bar, Chart
 } from "react-chartjs-2"
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement, ChartData, ChartOptions} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import chartConfigs from "./ChatsConfigs";
import { useAppSelector } from "app/hooks";
import { currentWether } from "app/selectors";
import { useEffect, useState, useRef } from "react"
import Container from "components/Container/Container";
import styles from './Charts.module.scss'

ChartJS.register(annotationPlugin, ChartDataLabels, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, BarController, BarElement)

const {tempChartConfig} = chartConfigs()

const Charts = () => {

    const tempRef = useRef<ChartJS<"line", number[], string>>(null)

    const wether = useAppSelector(currentWether)

    useEffect(() => {
        updateCharts()
    }, [wether])

    const updateCharts = () => {
        if (wether) {
            const {dailyTime, dailyTemp} = wether

            tempChartConfig.data.labels = dailyTime
            tempChartConfig.data.datasets[0].data = dailyTemp
            const chart = tempRef.current
            if (chart) {
                chart.data.datasets[0].data = dailyTemp
                chart.update('active')
            }
            // if (!tempChart) {
            //     tempChartConfig.data.labels = dailyTime;
            //     tempChartConfig.data.datasets[0].data = dailyTemp,
            //     tempChart = new Chart(element, tempChartConfig);
            //   } else {
            //       function addData(chart, data) {
            //         chart.data.datasets[0].data = data;
            //         chart.update('active');
            //       }
            //       addData(tempChart, dailyTemp);
            //   }
        }
    }

    return (
        <div className={styles.charts}>
            <div className={styles.chart__inner}>
            <Container>
                <>
                    <div className={styles.chartTitle}>Температура</div>
                    <div className={styles.chartWrapper}>
                        <div className={styles.chart_container}>
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
            
        </div>
        
    )
}

export default Charts