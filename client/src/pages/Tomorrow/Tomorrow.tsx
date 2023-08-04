import Charts from 'components/Charts/Charts'
import Background from 'widgets/Background/Background'
import CurrentWeather from 'components/CurrentWeather/CurrentWeather'
import Precipitations from 'components/Precipitations/Precipitations'
import RecentLocations from 'components/RecentLocations/RecentLocations'
import SelectLocation from 'components/SelectLocation/SelectLocation'
import SideBar from 'widgets/SideBar/SideBar'
import Header from 'components/Header/Header'

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
