import Main from 'pages/Main';
import Tomorrow from 'pages/Tomorrow';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import TenDays from 'pages/TenDays';

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
  {
    path: "/tenDays",
    element: <TenDays />,
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
