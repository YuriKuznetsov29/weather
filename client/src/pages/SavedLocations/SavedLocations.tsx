import SideBar from 'components/SideBar/SideBar'
import Header from 'components/Header/Header'
import { Locations } from 'modules/Locations'
import PrivateRoute from 'components/hoc/PrivateRoute'

const SavedLocatons = () => (
    <PrivateRoute>
        <>
            <Header background={true}>
                <SideBar />
            </Header>
            <Locations />
        </>
    </PrivateRoute>
)

export default SavedLocatons
