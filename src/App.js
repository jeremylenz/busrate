import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusRouteSearchPage from './components/BusRouteSearchPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BusRouteSearchPage />
      </div>
    );
  }
}

export default App;
