import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger/src';
import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));
const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;