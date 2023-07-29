import Background from "components/Background/Background"
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
            <Background>
                <>
                    <SelectLocation />
                    <RecentLocations />
                </>
            </Background>
            <TenDaysWeather />
        </>
    )
}

export default TenDays