import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

import { Home, Test, LoginPg, Workstation, RegisterPg } from '../containers';
// import Workstation from '../pgs/Workstation';
// import { LifeCycle } from '../components';  

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Route exact={true} path="/login" component={LoginPg} />
            <Route exact={true} path="/register" component={RegisterPg} />
              <Route exact path="/">
                {loggedIn() ? <Redirect to="/login" /> : <Home />} 
              </Route>
              <Route exact path="/workstation">{loggedIn() ? <Redirect to="/t" /> : <Workstation/>}
              </Route>
              <Route exact={true} path="/test" component={Test} />
          </Router>
      </Provider>
    );
  }
}


const loggedIn = () => {
  if(true) return true;
  else return false;
}

export default App;