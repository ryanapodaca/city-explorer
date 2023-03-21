import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map';
import Lorm from './Lorm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      cityMap: '',
      error: false,
      errorMessage: ''
    }
  }



  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (event) => {
    event.preventDefault();

    console.log('inside get city data');
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

      let cityDataFromAxios = await axios.get(url);
      
      console.log(cityDataFromAxios);
      
      this.setState({
        cityData: cityDataFromAxios.data,
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`
      })


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
      </>
    )
  }
}

export default App;
