import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes.js'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

class App extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div className="App">
        <div className='container'>
          <Provider store={store}>
            <Router>
              <Routes />
            </Router>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;
