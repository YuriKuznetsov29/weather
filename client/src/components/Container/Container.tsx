import styles from './Container.module.scss'

interface ContainerProp {
    children: JSX.Element
}

const Container = ({children}: ContainerProp)  => (
    <div className={styles.container}>
        {children}
    </div>
)

export default Container