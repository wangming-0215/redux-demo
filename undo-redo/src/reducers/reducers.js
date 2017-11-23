import { UNDO, REDO } from '../actions/actions';

// 没有任何功能的reducer enhancer
function doNothingWith(reducer) {
  return function(state, action) {
    // 仅仅调用传入的reducer
    return reducer(state, action);
  };
}

// 组合其他reducer的reducer enhancer
function combineReducers(reducers) {
  return function(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      // 调用每一个reducer并将器管理的state传给它
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}
