// export const logger = store => {
//   let next = store.dispatch;
// store.dispatch = function(action) {
//   console.log('will dispatch action: ', action);
//   let returnValue = next(action);
//   console.log('state after dispatch action: ', store.getState());
//   return returnValue;
// };
//   return function(action) {
//     console.log('will dispatch action: ', action);
//     let returnValue = next(action);
//     console.log('state after dispatch action: ', store.getState());
//     return returnValue;
//   };
// };

// export const applyMiddlewareByMonkeypatching = (store, middlewares) => {
//   middlewares = middlewares.slice();
//   middlewares.reverse();
//   // 在每一个 middleware 中变换 dispatch 方法。
//   middlewares.forEach(middleware => (store.dispatch = middleware(store)));
// };

export const logger = store => next => action => {
  console.log('will dispatch action: ', action);
  let result = next(action);
  console.log('state after dispatch action: ', store.getState());
  return result;
};

// export const applyMiddleware = (store, middlewares) => {
//   debugger;
//   middlewares = middlewares.slice();
//   middlewares.reverse();
//   let dispatch = store.dispatch;
//   middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)));
//   return Object.assign({}, store, { dispatch });
// };
