import React, {Component, useState, useEffect} from 'react'
import Layout from './Containers/Layout/Layout'


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
      <div className="App">
        <Layout />
      </div>
  );
 }
}

export default App;
