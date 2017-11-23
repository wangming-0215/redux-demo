import { createStore, applyMiddleware } from 'redux';
import {
  logger
  // applyMiddleware
} from './middleware/loggerMiddleware';
import { dispatchAction } from './actions/actions';
import rootReducer from './reducers/reducers';

let store = createStore(rootReducer, applyMiddleware(logger));
// applyMiddleware(store, [logger]);
store.dispatch(dispatchAction('wangming'));
