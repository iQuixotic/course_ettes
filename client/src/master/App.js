import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

import { Home, Test, LoginPg, Workstation, RegisterPg, DecksDisplayPg, DeckReviewPg,
        MyDecksPg, HomePg
} from '../containers';
// import Workstation from '../pgs/Workstation';
// import { LifeCycle } from '../components';  

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Route exact={true} path="/login" component={LoginPg} />
            <Route exact={true} path="/register" component={RegisterPg} />
              <Route exact path="/">{loggedIn() ?  <Home />: <Redirect to="/login" /> }</Route>
              <Route exact path="/decksDisplay" component={DecksDisplayPg} />
              <Route exact path="/deckReview/:id" component={DeckReviewPg} />
              <Route exact path="/workstation">{loggedIn() ? <HomePg/> : <Redirect to="/login" />} </Route>
              <Route exact path="/decks/mine">{loggedIn() ? <MyDecksPg/> : <Redirect to="/login" />} </Route>
              <Route exact={true} path="/test" component={Test} />
          </Router>
      </Provider>
    );
  }
}


const loggedIn = () => {
  if(window.localStorage.getItem("token") === 'undefined' || 
     window.localStorage.getItem("token") === undefined || 
     window.localStorage.getItem("token") === null) {
    return false;
  }
  else return true;
}

export default App;