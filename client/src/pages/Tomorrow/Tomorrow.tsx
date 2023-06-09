import Charts from "components/Charts/Charts"
import Backgroud from "components/Background/Background"
import CurrentWeather from "components/CurrentWeather/CurrentWeather"
import Precipitations from "components/Precipitations/Precipitations"
import RecentLocations from "components/RecentLocations/RecentLocations"
import SelectLocation from "components/SelectLocation/SelectLocation"
import SideBar from "components/SideBar/SideBar"
import Header from "components/Header/Header"

const Tomorrow = () => (
    <>
        <Header>
            <SideBar />
        </Header>
        <Backgroud>
            <>
                <SelectLocation />
                <RecentLocations />
            </>
        </Backgroud>
        <CurrentWeather />
        <Precipitations />
        <Charts />
    </>
)

export default Tomorrow