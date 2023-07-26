import styles from './Container.module.scss'

interface ContainerProp {
    children: React.ReactNode
}

const Container = ({children}: ContainerProp)  => (
    <div className={styles.container}>
        {children}
    </div>
)

export default Container