import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Routes from './Routes';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
      // basename="/dragalia-lost"
      >
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
