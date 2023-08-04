import SideBar from 'widgets/SideBar/SideBar'
import Header from 'components/Header/Header'
import Locations from 'components/Locations/Locations'
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
