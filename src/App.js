import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import NagivationBar from './components/NagivationBar';
import Main from './components/pages/main/Main';
import Algorithms from './components/pages/Algorithms';
import About from './components/pages/About';

class App extends Component {
  render() {
    return (
      <Router>
        <NagivationBar/>

        <Switch>
          <Route strict path="/"><Main/></Route>
          <Route path="/algorithms"><Algorithms/></Route>
          <Route path="/about"><About/></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;