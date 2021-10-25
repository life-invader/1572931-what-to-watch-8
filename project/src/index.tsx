import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import { fetchMovies } from './store/api-action';
import { AuthStatus } from './const';
import { mockMovies } from './mocks/films';
import type { ThunkAppDispatch } from './store/type';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthStatus.NoAuth)));
const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), composeWithDevTools()));

(store.dispatch as ThunkAppDispatch)(fetchMovies());

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
