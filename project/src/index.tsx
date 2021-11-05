import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import {
  fetchMovies,
  checkAuth
} from './store/api-action';
import { redirect } from './store/middleware';
import { AuthStatus } from './const';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthStatus.NoAuth)));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchMovies());
store.dispatch(checkAuth());

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
