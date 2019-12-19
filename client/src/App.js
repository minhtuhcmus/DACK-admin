import React from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import AppRouter from './routes';
import store from './store';
import 'antd/dist/antd.css';
import './style';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

const App = () => {
  return (
    <CookiesProvider>  
      <Provider store={ store }>
        <I18nextProvider i18n={i18n}>
          <AppRouter/>
        </I18nextProvider>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
