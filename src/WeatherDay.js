import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

class WeatherDay extends React.Component {

  render() {
    return (
      <>
        <Accordion defaultActiveKey="0">
              <Accordion.Item>
                <Accordion.Header>
                  Forecast Date: {this.props.date}
                </Accordion.Header>
                <Accordion.Body>
                  Forecast: {this.props.description}
                </Accordion.Body>
              </Accordion.Item>
        </Accordion>
      </>

    )
  }
}

export default WeatherDay;