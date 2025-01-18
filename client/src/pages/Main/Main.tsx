import { Charts } from 'modules/Charts'
import Background from 'components/Background/Background'
import { CurrentWeather } from 'modules/Weather'
import { Precipitations } from 'modules/Weather'
import { RecentLocations, SelectLocation } from 'modules/Locations'
import SideBar from 'components/SideBar/SideBar'
import Header from 'components/Header/Header'

const Main = () => (
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

export default Main
