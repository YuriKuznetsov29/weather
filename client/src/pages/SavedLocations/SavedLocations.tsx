import SideBar from 'widgets/SideBar/SideBar'
import Header from 'widgets/Header/Header'
import Locations from 'widgets/Locations/Locations'
import PrivateRoute from 'widgets/hoc/PrivateRoute'

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
