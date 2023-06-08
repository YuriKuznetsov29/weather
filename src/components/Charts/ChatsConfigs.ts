import ChartDataLabels from "chartjs-plugin-datalabels"
import { ChartOptions, ChartData } from "chart.js"
const CHART_COLORS = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
}

let arrow = document.createElement("img")
arrow.src = "arrow-up-bold.svg"
// let sun = document.createElement('img');
// sun.src = 'sun.png';

interface LineProps {
    options: ChartOptions<"line">
    data: ChartData<"line">
}

const chartConfigs = () => {
    const tempChartConfig: LineProps = {
        // type: "line",
        // color: "#fff",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Temperature",
                    fill: "start",
                    backgroundColor: CHART_COLORS.blue,
                    borderColor: CHART_COLORS.red,
                    // color: "#fff",
                    tension: 0.1,
                    data: [],
                    datalabels: {
                        align: "end",
                        // anchor: 'end'
                    },
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                datalabels: {
                    padding: 10,
                },
                subtitle: {
                    display: true,
                    // text: day,
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 24,
                        },
                    },
                },
            },
        },
    }

    const moiChartConfig = {
        type: "line",
        color: "#fff",
        data: {
            datasets: [
                {
                    label: "Moisture",
                    fill: "start",
                    backgroundColor: CHART_COLORS.purple,
                    borderColor: CHART_COLORS.green,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true
                    pointHitRadius: 5,
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                subtitle: {
                    display: true,
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 24,
                        },
                    },
                },
            },
        },
    }

    const windChartConfig = {
        type: "line",
        color: "#fff",
        data: {
            datasets: [
                {
                    borderColor: CHART_COLORS.orange,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true,
                    pointHitRadius: 10,
                    // rotation: res.dailyWindDir,
                    pointStyle: [arrow],
                    borderWidth: 0,
                    datalabels: {
                        display: false,
                    },
                },
                {
                    type: "bar",
                    label: "Wind",
                    fill: "start",
                    backgroundColor: CHART_COLORS.blue,
                    color: "#fff",
                    tension: 0.1,
                    pointHitRadius: 10,
                    datalabels: {
                        anchor: "end",
                    },
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            showAllTooltips: true,
            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                subtitle: {
                    display: true,
                    // text: day,
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: false,
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 24,
                        },
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
        },
    }

    const pressureChartConfig = {
        type: "line",
        color: "#fff",
        data: {
            // labels: res.dailyTime,
            datasets: [
                {
                    label: "Pressure",
                    // data: res.dailyPressure,
                    fill: "start",
                    backgroundColor: CHART_COLORS.green,
                    borderColor: CHART_COLORS.orange,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true
                    pointHitRadius: 5,
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                subtitle: {
                    display: true,
                    // text: day,
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 24,
                        },
                    },
                },
            },
        },
    }

    const annotation1 = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "Горизонт",
            display: true,
        },
        yScaleID: "y",
        yMax: 0.1,
        yMin: 0.1,

        xScaleID: "x",
        xMax: 90,
        xMin: 90,
    }

    const sunriseConfig = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "6:00",
            display: true,
        },
        yScaleID: "y",
        yMax: -0.9,
        yMin: -0.9,

        xScaleID: "x",
        xMax: 20,
        xMin: 20,
    }

    const annotation3 = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "Рассвет",
            display: true,
        },
        yScaleID: "y",
        yMax: -0.8,
        yMin: -0.8,

        xScaleID: "x",
        xMax: 20,
        xMin: 20,
    }

    const annotation4 = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "Истинный полдень",
            display: true,
        },
        yScaleID: "y",
        yMax: -0.8,
        yMin: -0.8,

        xScaleID: "x",
        xMax: 48,
        xMin: 48,
    }
    const trueNoonConfig = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "12:00",
            display: true,
        },
        yScaleID: "y",
        yMax: -0.9,
        yMin: -0.9,

        xScaleID: "x",
        xMax: 48,
        xMin: 48,
    }

    const sunsetConfig = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "18:00",
            display: true,
        },

        yScaleID: "y",
        yMax: -0.9,
        yMin: -0.9,

        xScaleID: "x",
        xMax: 75,
        xMin: 75,
    }

    const annotation5 = {
        type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "Закат",
            display: true,
        },

        yScaleID: "y",
        yMax: -0.8,
        yMin: -0.8,

        xScaleID: "x",
        xMax: 75,
        xMin: 75,
    }

    const sunChartConfig = {
        type: "line",
        // color: '#fff',
        data: {
            // labels: sunCalk()[0],
            datasets: [
                {
                    label: "Sunrise / Sunset",
                    // data: sunCalk()[1],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true
                    pointStyle: false,
                },
                {
                    label: "Sunrise / Sunset",
                    // data: sunCalk()[1].slice(0, 25), // 6:30 18:30
                    fill: {
                        target: "origin",
                        above: CHART_COLORS.yellow, // Area will be red above the origin
                        below: CHART_COLORS.purple, // And blue below the origin
                    },
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true
                    // pointStyle: false,
                },
                {
                    label: "Sunrise / Sunset",
                    data: [],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.grey,
                    color: "#fff",
                    tension: 0.1,
                    // hidden: true
                    pointStyle: false,
                },
                {
                    label: "Sunrise / Sunset",
                    // data: [],
                    fill: false,
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    color: "#fff",
                    tension: 0.1,
                    borderWidth: 3,
                    // hidden: true
                    pointStyle: [],
                    pointHitRadius: 0,
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            hover: { mode: null },
            elements: {
                point: {
                    display: false,
                    borderWidth: 0,
                    radius: 1,
                    hitRadius: -1,
                    hoverRadius: 0,
                    howerBorderWidth: 0,
                    hover: false,
                },
            },
            scales: {
                y: {
                    min: -1.5,
                    max: 1.5,
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                subtitle: {
                    display: true,
                    // text: day,
                    font: {
                        size: 24,
                    },
                },
                legend: {
                    display: false,

                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 24,
                        },
                    },
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    display: false,
                },
                annotation: {
                    annotations: {
                        annotation1,
                        sunriseConfig,
                        annotation3,
                        sunsetConfig,
                        annotation5,
                        annotation4,
                        trueNoonConfig,
                    },
                },
            },
        },
    }

    return {
        tempChartConfig,
        moiChartConfig,
        windChartConfig,
        pressureChartConfig,
        sunChartConfig,
        sunriseConfig,
        sunsetConfig,
        trueNoonConfig,
    }
}

export default chartConfigs
