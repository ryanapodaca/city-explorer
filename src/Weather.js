import React from 'react';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {

  render() {
    return (
      <>
      {this.props.weather.map((wObj, idx) => {
              return (
                <WeatherDay
                  description={wObj.description}
                  date={wObj.date}
                  id={idx}
                />
              )
            })}
      </>

    )
  }
}

export default Weather;