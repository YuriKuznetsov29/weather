import { Charts } from 'modules/Charts'
import Background from 'widgets/Background/Background'
import { CurrentWeather } from 'modules/Weather'
import Precipitations from 'widgets/Precipitations/Precipitations'
import {RecentLocations, SelectLocation} from 'modules/Locations'
import SideBar from 'widgets/SideBar/SideBar'
import Header from 'widgets/Header/Header'

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
        {/* <Form /> */}

        <CurrentWeather />
        <Precipitations />
        <Charts />
    </>
)

export default Main
