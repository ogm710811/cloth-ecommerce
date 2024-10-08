import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger/src';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);