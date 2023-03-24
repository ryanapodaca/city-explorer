import React from 'react';
import Figure from 'react-bootstrap/Figure';



class Map extends React.Component {

  render() {
    return (
      <>
        <Figure>
          <Figure.Image
            width={600}
            height={500}
            alt="City Map"
            src= {this.props.cityMapSrc}
          />
          <Figure.Caption>
            Longitude: {this.props.lon}
            Latitude: {this.props.lat}
          </Figure.Caption>
        </Figure>
      </>
    )
  }
}


export default Map;