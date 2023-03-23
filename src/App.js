import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map';
import Lorm from './Lorm';
import Weather from './Weather';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      cityMap: '',
      error: false,
      errorMessage: '',
      weather: [],
      movies: []
    }
  }


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleGetWeather = async (lat, lon) => {
    //Call server, pass in lat, lon, city name

    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}lon=${lon}`;

      let weatherData = await axios.get(url);

      this.setState({
        weather: weatherData
      })

      //pass weatherData as props.

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  handleGetMovies = async (queryCity) => {
    //Call server, pass in lat, lon, city name

    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?query=${queryCity}`;

      let movieData = await axios.get(url);

      this.setState({
        movies: movieData
      })

      //pass movieData as props.

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  getCityData = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`
      })

      //call weather handler
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.handleGetWeather(lat, lon);

      //call Movie handler
      this.handleGetMovies(this.state.city);


    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <>
        <h1>City Explorer</h1>
        <Lorm
          getCityData={this.getCityData}
          handleCityInput={this.handleCityInput}
        />
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <p>{this.state.cityData.display_name}</p>
        }
        <Map
          cityMapSrc={this.state.cityMap}
          lat={this.state.cityData.lat}
          lon={this.state.cityData.lon}
        />

        {this.state.weather.map((wObj, idx) => {
          return (
            <Weather
            description={wObj.description}
            date={wObj.date}
            id={idx}
            />
              )
        })}
     
        {this.state.movies.map((mObj, idx) => {
          return (
            <Movies
              title={mObj.movies}
              overview={mObj.overview}
              image={mObj.image}
              id={idx}
            />
          )
        })}

      </>
    )
  }
}

export default App;
