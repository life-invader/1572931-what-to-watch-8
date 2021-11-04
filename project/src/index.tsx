import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import {
  fetchMovies,
  checkAuth
} from './store/api-action';
import { redirect } from './store/middleware';
import { AuthStatus } from './const';
import type { ThunkAppDispatch } from './store/type';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthStatus.NoAuth)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)));

(store.dispatch as ThunkAppDispatch)(fetchMovies());
(store.dispatch as ThunkAppDispatch)(checkAuth());

const promoMovieInfo = {
  name: 'The Grand Budapest Hotel',
  release: 2014,
  genre: 'Drama',
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer limit={1} />
      <App promoMovieInfo={promoMovieInfo} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
