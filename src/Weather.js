import React from 'react';


class Weather extends React.Component {
  render() {
    return (
      <p>{this.props.weather}</p>
    )
  }
}

export default Weather;