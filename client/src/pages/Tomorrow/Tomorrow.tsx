import Charts from 'widgets/Charts/Charts'
import Background from 'widgets/Background/Background'
import { CurrentWeather } from 'modules/Weather'
import Precipitations from 'widgets/Precipitations/Precipitations'
import {RecentLocations, SelectLocation} from 'modules/Locations'
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
