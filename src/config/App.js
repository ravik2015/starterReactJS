/*
 * @file: App.js
 * @description: App Configration
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Routers from './Routers';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Loader from '../components/Loader';

export const history = createHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routers {...store} />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
