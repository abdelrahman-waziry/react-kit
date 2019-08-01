import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes';
import {createBrowserHistory} from 'history'
import {connect} from 'react-redux'

const history = createBrowserHistory()

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => ( <Component {...props}/>)}/>
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuthenticated.isAuthenticated
      ? <Component {...props}/>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
  )}/>
}

const Routes = (isAuthenticated) => (
  <Router hisotry={history}>
      <Switch>
        {routes.map((route, i) => {
          if(route.isAuth){
            return (
              <PrivateRoute isAuthenticated={isAuthenticated} key={i} {...route} />
            )
          }
          return( <PublicRoute key={i} {...route} />)
        })}
      </Switch>
  </Router>
)

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Routes)
