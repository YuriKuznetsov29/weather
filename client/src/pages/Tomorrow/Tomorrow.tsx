import { Charts } from 'modules/Charts'
import Background from 'widgets/Background/Background'
import { CurrentWeather, Precipitations } from 'modules/Weather'
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
