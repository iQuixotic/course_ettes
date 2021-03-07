import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

import { Home, Test } from '../pgs';
import Workstation from '../pgs/Workstation';
// import { LifeCycle } from '../components';  

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/workstation" component={Workstation} />
              <Route exact={true} path="/test" component={Test} />
          </Router>
      </Provider>
    );
  }
}

export default App;