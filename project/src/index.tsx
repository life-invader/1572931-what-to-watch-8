import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promoMovieInfo = {
  name: 'The Grand Budapest Hotel',
  release: 2014,
  genre: 'Drama',
};

ReactDOM.render(
  <React.StrictMode>
    <App promoMovieInfo={promoMovieInfo} />
  </React.StrictMode>,
  document.getElementById('root'));
