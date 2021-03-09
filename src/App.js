import React, {Component, useState, useEffect} from 'react'
import Layout from './Containers/Layout/Layout'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    hideText: true
  }
  toggleHideTxt = () => {
    let newVal = !this.state.hideText
    this.setState({hideText: newVal})
    
  }
  

  render(){
    return (
          <Router>
            <main className="App">
              <Layout />
            </main>
          </Router>
  );
 }
}

export default App;
