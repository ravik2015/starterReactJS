/*
 * @file: configureStore.prod.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducer';

export default history => {
  const store = createStore(reducer, compose(applyMiddleware(thunk, routerMiddleware(history))));
  const persistor = persistStore(store);
  return { persistor, store };
};
