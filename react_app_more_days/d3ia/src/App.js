import React, { Component } from 'react';
import './App.css';
import Barchart from './barchart';
import Worldmap from "./worldmap";
class App extends Component {
   render() {
   return (
      <div className='App'>
      <div className='App-header'>
      <h2>d3ia dashboard</h2>
      </div>
      <div>
      <Barchart data={[5,10,1,3]} size={[500,500]} />
      <Worldmap size={[1000,1000]} />

      </div>
      </div>
   )
   }
}
export default App