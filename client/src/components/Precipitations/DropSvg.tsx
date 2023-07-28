import styles from "./Precipitations.module.scss"

interface PrecipitationsPercent {
    [key: string]: number
}

interface DropSvgProps {
    pecipitation: number
    i: number
}

const DropSvg = ({ pecipitation, i }: DropSvgProps) => {
    function calckPrecipitationInHour(quantity: number) {
        const precipPercent: PrecipitationsPercent = {
            "0.1": 0,
            "0.9": 20,
            "1": 30,
            "2": 55,
            "3": 65,
            "4": 80,
            "5": 90,
            "6": 100,
        }
        quantity =
            quantity > 1 ? (quantity >= 6 ? 6 : Math.round(quantity)) : quantity > 0.1 ? 0.9 : 0.1
        return precipPercent[quantity]
    }

    const percent = calckPrecipitationInHour(pecipitation)

    return (
        <svg
            className={styles.precipitation__quantity_drop}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="40"
            height="40"
        >
            <linearGradient id={`inside-gradient${i}`} x1="100%" y1="100%">
                <stop offset={`${percent}%`} stopColor="rgba(8, 0, 255, 1)" />
                <stop offset="0" stopColor="rgba(0, 0, 0, 0.0)" />
            </linearGradient>
            <linearGradient id={`stroke-gradient${i}`} x1="100%" y1="100%">
                <stop offset="0" stopColor="blue" />
                <stop offset="0" stopColor="white" />
            </linearGradient>
            <rect width="36" height="36" fill="none" />
            <path
                d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z"
                fill={`url(#inside-gradient${i})`}
                stroke="rgba(161, 161, 161, 0.8)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
        </svg>
    )
}

export default DropSvg
