import Container from "components/Container/Container"
import Location from "components/RecentLocations/Location"
import { CurrentLocation } from "app/slices/locationSlice"

import styles from './Locations.module.scss'
import { useAppSelector } from "app/hooks"
import { userSelector } from "app/selectors"

const Locations = () => {

    const locations: CurrentLocation[] = [{"lat":59.93863,"lon":30.31413,"city":"Санкт-Петербург","timezone":"Europe/Moscow","country":"Россия"},{"lat":64.4165,"lon":40.8122,"city":"Новодвинск","timezone":"Europe/Moscow","country":"Россия"}]
    const { savedLocations } = useAppSelector(userSelector)

    const renderLocations = () => {
        return (
        <div className={styles.locationWrapper}>
            {
                savedLocations.length > 0 ? savedLocations.map((location, i) => {
                    return (
                        <Location key={i} location={location} />
                    )
                }) 
                : <h1>У вас нет сохраненных городов</h1>
            }
        </div>
        )
        
    }

    const content = renderLocations()

    return (
        <Container>
            <> 
                {content}
            </>
        </Container>
    )
}

export default Locations