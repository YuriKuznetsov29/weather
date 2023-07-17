import { ChartOptions, ChartData } from "chart.js"
import { LineAnnotationOptions } from "chartjs-plugin-annotation"
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
        data: {
            labels: [],
            datasets: [
                {
                    label: "Temperature",
                    fill: "start",
                    backgroundColor: CHART_COLORS.blue,
                    borderColor: CHART_COLORS.red,
                    tension: 0.1,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    datalabels: {
                        align: "end",
                        // anchor: 'end'
                    },
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 35,
                    left: 0,
                    right: 0
                },
            },
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

    const windChartConfig = {
        data: {
            labels: [""],
            datasets: [
                {
                    type: "line" as const,
                    borderColor: CHART_COLORS.orange,
                    // color: "#fff",
                    tension: 0.1,
                    // hidden: true,
                    pointHitRadius: 10,
                    // rotation: [0],
                    pointStyle: [arrow],
                    borderWidth: 0,
                    datalabels: {
                        display: false,
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                    type: "bar" as const,
                    label: "Wind",
                    // fill: "start",
                    backgroundColor: CHART_COLORS.blue,
                    color: "#fff",
                    tension: 0.1,
                    pointHitRadius: 10,
                    datalabels: {
                        // anchor: "end",
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    grouped: true
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            showAllTooltips: true,
            elements: {
                point: {
                    rotation: [0],
                },
            },
            layout: {
                padding: {
                    top: 35,
                    left: 0,
                    right: 0
                },
            },
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
                tooltip: {
                    enabled: false,
                },
            },
        },
    }

    const horizontConfig: LineAnnotationOptions = {
        // type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "Горизонт",
            display: true,
            // font: {
            //     weight: 400,
            // },
        },
        yScaleID: "y",
        yMax: 0.07,
        yMin: 0.07,

        xScaleID: "x",
        xMax: 95,
        xMin: 95,
    }

    const sunriseConfig = {
        // type: "line",
        borderColor: "black",
        borderWidth: 0,
        label: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            color: "#000",
            content: "6:00",
            display: true,

            font: {
                weight: 400,
            },
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
            font: {
                weight: 400,
            },
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
            font: {
                weight: 400,
            },
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
            font: {
                weight: 400,
            },
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
            font: {
                weight: 400,
            },
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
            font: {
                weight: 400,
            },
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

        data: {
            labels: [""],
            datasets: [
                {
                    type: "line" as const,
                    label: "Sunrise / Sunset",
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    borderWidth: 2,
                    color: "#fff",
                    tension: 0.1,
                    pointStyle: false,
                },
                {
                    type: "line" as const,
                    label: "Sunrise / Sunset",
                    fill: {
                        target: "origin",
                        above: CHART_COLORS.yellow,
                        below: CHART_COLORS.purple,
                    },
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.orange,
                    borderWidth: 2,
                    pointHitRadius: 0,
                    color: "#fff",
                    tension: 0.1,
                    pointRadius: 0,
                },
                {
                    type: "line" as const,
                    label: "Sunrise / Sunset",
                    data: [],
                    fill: false,
                    backgroundColor: CHART_COLORS.yellow,
                    borderColor: CHART_COLORS.grey,
                    borderWidth: 2,
                    color: "#fff",
                    tension: 0.1,
                    pointStyle: false,
                },
                {
                    type: "line" as const,
                    label: "Sunrise / Sunset",
                    fill: false,
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    color: "#fff",
                    tension: 0.1,
                    borderWidth: 2,
                    pointStyle: [0] as number[] | HTMLImageElement[],
                    pointHitRadius: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 35,
                },
            },
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
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    display: false,
                },
                annotation: {
                    annotations: {
                        horizontConfig,
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
        windChartConfig,
        sunChartConfig,
        sunriseConfig,
        sunsetConfig,
        trueNoonConfig,
        horizontConfig,
    }
}

export default chartConfigs
