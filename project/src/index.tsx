/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createAPI } from './services/api';
import { requireAuthorization, fetchMovies } from './store/action';
import { AuthStatus } from './const';
import { mockMovies } from './mocks/films';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthStatus.NoAuth)));
const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), composeWithDevTools()));

store.dispatch(fetchMovies());

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
  </React.StrictMode>,
  document.getElementById('root'));
