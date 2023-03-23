import React from 'react';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={this.props.image} alt='movie poster' title='movie poster' />
      <Card.Body>
        <Card.Title>{this.props.movies.title}</Card.Title>
        <Card.Text>
          {this.props.overview}
        </Card.Text>
      </Card.Body>
    </Card>
      
    )
  }
}

export default Movies;