import SideBar from "components/SideBar/SideBar"
import Header from "components/Header/Header"
import Locations from "components/Locations/Locations"

const SavedLocatons = () => (
  <>
    <Header background={true}>
      <SideBar />
    </Header>
    <Locations />
   
  </>
)

export default SavedLocatons
