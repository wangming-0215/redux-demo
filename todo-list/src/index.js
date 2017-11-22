import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers/reducers';

let store = createStore(todoApp);

let root = document.querySelector('#root');
if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/app', () => render(App));
}
