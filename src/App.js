import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map';
import Lorm from './Lorm';
import Weather from './Weather';
import Movie from './Movie';

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
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;

      let weatherData = await axios.get(url);

      this.setState({
        weather: weatherData.data
      })

      //pass weatherData as props. //

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  handleGetMovies = async (queryCity) => {

    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?query=${queryCity}`;

      let movieData = await axios.get(url);

      this.setState({
        movies: movieData.data
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
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=13`
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

        <main>
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
          <div id='weather' >
            {this.state.weather.map((wObj, idx) => {
              return (
                <Weather
                  description={wObj.description}
                  date={wObj.date}
                  id={idx}
                />
              )
            })}
          </div>

          <div id='movies'>
            {this.state.movies.map((mObj, idx) => {
              return (
                <Movie
                  title={mObj.title}
                  overview={mObj.overview}
                  image={mObj.image}
                  id={idx}
                />
              )
            })}
          </div>

        </main>
      </>
    )
  }
}

export default App;
