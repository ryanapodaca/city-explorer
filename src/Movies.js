import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    return (
      <>
           {this.props.movies.map((mObj, idx) => {
          return (
            <Movie
              title={mObj.title}
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

export default Movies;