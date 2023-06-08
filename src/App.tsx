import Header from 'components/Header/Header';
import Main from 'pages/Main';

import styles from './App.module.scss';

function App() {
  return (
    <>
      <div className={styles.background}></div>
      <Header />
      <Main />
    </>
  );
}

export default App;
