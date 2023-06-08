import Charts from "components/Charts/Charts"
import Backgroud from "components/Background/Background"
import CurrentWeather from "components/CurrentWeather/CurrentWeather"
import Precipitations from "components/Precipitations/Precipitations"
import RecentLocations from "components/RecentLocations/RecentLocations"
import SelectLocation from "components/SelectLocation/SelectLocation"

const Main = () => (
    <>
        <Backgroud />
        <SelectLocation />
        <RecentLocations />
        <CurrentWeather />
        <Precipitations />
        <Charts />
    </>
)

export default Main