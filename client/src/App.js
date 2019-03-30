import React from 'react';
import { Provider } from 'react-redux';

import Main from 'src/views/Main';
import store from './redux/store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Main />
    </div>
  </Provider>
);

export default App;
