import React from 'react';
import Figure from 'react-bootstrap/Figure';



class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt="171x180"
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