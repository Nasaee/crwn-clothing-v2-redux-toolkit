// import { compose, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: persistedReducer,
  //(if not assign middleware) redux-toolkit includes 3 middleware by defaul 1. thunk, 2.serializableCheck , 3.immutableCheck
  // middleware: middleWares,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware return array
    getDefaultMiddleware({
      // ignore serializableCheck middleware check
      serializableCheck: false,
    }).concat(middleWares), // concat with custom middleware
});

export const persistor = persistStore(store);
