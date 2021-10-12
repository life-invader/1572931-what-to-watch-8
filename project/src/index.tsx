import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {mockMovies} from './mocks/films';

const promoMovieInfo = {
  name: 'The Grand Budapest Hotel',
  release: 2014,
  genre: 'Drama',
};

ReactDOM.render(
  <React.StrictMode>
    <App promoMovieInfo={promoMovieInfo} movies={mockMovies} />
  </React.StrictMode>,
  document.getElementById('root'));
