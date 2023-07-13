import styles from './Spinner.module.scss'


const Spinner = () => {
    return (
        <div className={styles.background}>
            <img className={styles.sun} src="sun.svg" alt="sun" />
        </div>
    );
};

export default Spinner;