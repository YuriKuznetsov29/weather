import Charts from 'widgets/Charts/Charts'
import Background from 'widgets/Background/Background'
import CurrentWeather from 'widgets/CurrentWeather/CurrentWeather'
import Precipitations from 'widgets/Precipitations/Precipitations'
import RecentLocations from 'widgets/RecentLocations/RecentLocations'
import SelectLocation from 'widgets/SelectLocation/SelectLocation'
import SideBar from 'widgets/SideBar/SideBar'
import Header from 'widgets/Header/Header'

const Tomorrow = () => (
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
        <CurrentWeather />
        <Precipitations />
        <Charts />
    </>
)

export default Tomorrow
