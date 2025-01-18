import Container from 'shared/ui/Container/Container'
import Location from '../Location/Location'
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'

import styles from './Locations.module.scss'
import { userSelector } from 'modules/Authorization/store/selectors'

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
