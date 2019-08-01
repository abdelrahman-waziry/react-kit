import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import store from './store'
import Routes from './routes/index'

import { authCheck, setLocale } from './admin/modules/auth/store/actions'

store.dispatch(authCheck())
store.dispatch(setLocale('ar'))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}

export default App;
