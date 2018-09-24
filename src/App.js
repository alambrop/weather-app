import React, { Component } from 'react';
import './CSS/App.css';
import WeatherForm from './Modules/WeatherForm'


class App extends Component {
  render() { 
    return (
      <div className= "white-square-container">
        <body>
          <h1 className= "App-title">Weather App</h1>
          <p className= "white-square">  <WeatherForm/> </p>  
        </body>      
      </div>   
    );
  }
}
  
export default App; 