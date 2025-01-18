import { Charts } from 'modules/Charts'
import Background from 'components/Background/Background'
import { CurrentWeather, Precipitations } from 'modules/Weather'
import { RecentLocations, SelectLocation } from 'modules/Locations'
import SideBar from 'components/SideBar/SideBar'
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
