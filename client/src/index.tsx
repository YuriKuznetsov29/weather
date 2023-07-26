import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from 'app/App';

import './styles/index.scss';
import BarProvider from 'components/SideBar/BarProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BarProvider>
        <App/>
      </BarProvider>
    </Provider>
  </React.StrictMode>
);