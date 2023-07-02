import Main from 'pages/Main';
import Tomorrow from 'pages/Tomorrow';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TenDays from 'pages/TenDays';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { checkAuth } from 'app/slices/loginSlice';

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

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  return (
    <>
      {/* <div className={styles.background}></div> */}
      {/* <Header /> */}
      <RouterProvider router={router} />

    </>
  );
}

export default App;
