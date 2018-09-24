import React, { Component } from 'react';
import request from "request";


const UsernameComponent = ({city, cityHandler}) => (
    <input type = "text" placeholder = "city" value = {city} onChange = {cityHandler} />
)
  
const RenderTemperature = ({city, weather, temperature}) => (
    <div>
      <h1>It's {weather} and {temperature} degrees F in {city}</h1>
    </div> 
)
  
const PasswordComponent = ({country, countryHandler}) => (
    <div>
      <input type = "text" placeholder = "country" value = {country} onChange = {countryHandler} />
    </div>
)
  
class WeatherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            country: "",
            weather:"",
            temperature:"",
            errorMessage:"",
            error: false,
            clicked: false    
        }     
    }
  
    cityHandler = e => {
      this.setState({
        clicked: false,
        city: e.target.value,
      });
    }
  
    countryHandler = e => {
      this.setState({
        country: e.target.value,
      });
    }
  
    submitHandler = e => {
  
      e.preventDefault();
      if(!this.state.city) {
        alert("Enter a city")
      }
      else {
        let apiKey = '6850b7fa7da67da1192784531b570210';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=imperial&appid=${apiKey}`
  
        request(url, (err, response, body) => {
          if(err){
            console.log('error:', err);
          } 
          else {
            console.log('this2', body);
            let jsonObject = JSON.parse(body);
  
            if (jsonObject.cod !== 200) {
              alert("The city is invalid")
            }   
            else {
              this.setState({
                weather: jsonObject.weather[0].main,
                temperature: jsonObject.main.temp, 
                city: jsonObject.name,
                clicked : true})
            }
          }        
        });   
      }
    }
  
    render() {
      return (
        <div>
          <h3 className='Login-Title'>Login</h3>
          <UsernameComponent city={this.state.city} cityHandler={this.cityHandler}/>
          
          <button onClick={this.submitHandler}> Search </button>
          {(this.state.clicked) ?<RenderTemperature weather={this.state.weather} temperature={this.state.temperature} city={this.state.city} errorMessage = {this.errorMessage} error = {this.error}/> : null }
        </div>
      );
    }
}
  
export default WeatherForm;