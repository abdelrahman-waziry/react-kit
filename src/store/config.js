/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import signalRMiddleware from './signalR';

export default function (initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
    applyMiddleware(signalRMiddleware)
  ]
  
  if (process.env.NODE_ENV !== 'production') {
    window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }
  
  const store = createStore(rootReducer, initialState, compose(...enhancers))
  
  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }
  
  return store
}
