import { getTimeWithUtcOffset } from 'helpers/transformData'
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import Day from './Day'
import { currentWetherSelector } from 'modules/Weather/store/selectors'

const TenDaysWeather = () => {
    const weather = useAppSelector(currentWetherSelector)

    const renderContent = () => {
        if (weather) {
            const {
                sunrise,
                sunset,
                weathercode,
                utcOffset,
                moi,
                wind,
                windDir,
                uvIndex,
                tempMax,
                tempMin,
                dailyTemp,
                hourlyWeatherCode,
                dailyTime,
            } = weather.tenDaysWeather
            let startOffset = utcOffset
            const content = []
            for (let i = 0; i < 10; i++) {
                const { day, month, week } = getTimeWithUtcOffset(startOffset)
                startOffset += 84600
                content.push(
                    <Day
                        day={day}
                        moi={moi[i]}
                        month={month}
                        sunrise={sunrise[i]}
                        sunset={sunset[i]}
                        tempMax={tempMax[i]}
                        tempMin={tempMin[i]}
                        utcOffset={utcOffset}
                        uvIndex={uvIndex[i]}
                        weathercode={weathercode[i]}
                        week={week}
                        wind={wind[i]}
                        windDir={windDir[i]}
                        dailyTemp={dailyTemp[i]}
                        hourlyWeatherCode={hourlyWeatherCode[i]}
                        dailyTime={dailyTime}
                        key={i}
                    />
                )
            }
            return content
        }
    }

    const content = renderContent()

    return <>{content}</>
}

export default TenDaysWeather
