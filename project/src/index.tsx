import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { mockMovies } from './mocks/films';

const store = createStore(reducer, composeWithDevTools());

const promoMovieInfo = {
  name: 'The Grand Budapest Hotel',
  release: 2014,
  genre: 'Drama',
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoMovieInfo={promoMovieInfo} movies={mockMovies} />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root'));
