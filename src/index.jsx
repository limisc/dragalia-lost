import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import store from './store';
import Routes from './Routes';
import './styles/styles.scss';

smoothscroll.polyfill();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
