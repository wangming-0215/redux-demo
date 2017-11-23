import { combineReducers } from 'redux';
import { DISPATCH_ACTION } from '../actions/actions';
function dispatchActionReducer(state = [], action) {
  switch (action.type) {
    case DISPATCH_ACTION:
      return [...state, { text: action.text }];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ dispatchActionReducer });

export default rootReducer;
