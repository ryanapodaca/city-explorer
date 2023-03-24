import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Lorm extends React.Component {

  render() {
    return (
      <>
        <Form
          onSubmit={this.props.getCityData}>
          <Form.Group>
            <Form.Label>Search for a Place</Form.Label>
            <Form.Control
              placeholder="Enter a Location"
              onChange={this.props.handleCityInput} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit">
            Explore!
          </Button>
        </Form>
      </>
    )
  }
}


export default Lorm;