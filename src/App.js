import React, { Component } from 'react';
import Board from './Board'
import './App.css';

class App extends Component {
  render(){
    return(
      <Board chanceLightStartsOn={0.75}/>
    )
  }
}

export default App;
