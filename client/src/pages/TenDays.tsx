import Backgroud from "components/Background/Background"
import RecentLocations from "components/RecentLocations/RecentLocations"
import SelectLocation from "components/SelectLocation/SelectLocation"
import SideBar from "components/SideBar/SideBar"
import Header from "components/Header/Header"
import TenDaysWeather from "components/TenDays/TenDaysWeather"

const TenDays = () => {
    return (
        <>
            <Header>
                <SideBar />
            </Header>
            <Backgroud />
            <SelectLocation />
            <RecentLocations />
            <TenDaysWeather />
        </>
    )
}

export default TenDays