import Container from "components/Container/Container"
import Location from "components/RecentLocations/Location"
import { useAppSelector } from "app/hooks"
import { userSelector } from "app/selectors"

import styles from "./Locations.module.scss"

const Locations = () => {
    const { savedLocations } = useAppSelector(userSelector)

    const renderLocations = () => {
        return (
            <div className={styles.locationWrapper}>
                {Array.isArray(savedLocations) && savedLocations.length > 0 ? (
                    savedLocations.map((location, i) => {
                        return <Location key={i} location={location} redirect={true} />
                    })
                ) : (
                    <h1>У вас нет сохраненных городов</h1>
                )}
            </div>
        )
    }

    const content = renderLocations()

    return (
        <Container>
            <>{content}</>
        </Container>
    )
}

export default Locations
