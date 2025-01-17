import Background from 'widgets/Background/Background'
import {RecentLocations, SelectLocation} from 'modules/Locations'
import SideBar from 'widgets/SideBar/SideBar'
import Header from 'widgets/Header/Header'
import TenDaysWeather from 'widgets/TenDays/TenDaysWeather'

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
