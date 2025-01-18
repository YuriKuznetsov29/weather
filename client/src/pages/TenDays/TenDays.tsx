import Background from 'components/Background/Background'
import { RecentLocations, SelectLocation } from 'modules/Locations'
import SideBar from 'components/SideBar/SideBar'
import Header from 'components/Header/Header'
import { TenDaysWeather } from 'modules/Weather'

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
