import Main from 'pages/Main';
import Tomorrow from 'pages/Tomorrow';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import styles from './App.module.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tomorrow",
    element: <Tomorrow />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      {/* <div className={styles.background}></div> */}
      {/* <Header /> */}
      <RouterProvider router={router} />

    </>
  );
}

export default App;
