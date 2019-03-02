import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes.js'


class App extends Component {

  componentDidMount() {
  }

  render() {

    return (
        <div className="App">
          <div className='container'>
              <Router>
                <Routes />
              </Router>
          </div>
        </div>
    );
  }
}

export default App;
