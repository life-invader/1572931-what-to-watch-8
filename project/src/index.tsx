import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import {
  fetchMovies,
  checkAuth
} from './store/api-action';
import { redirect } from './store/middleware/redirect';
import { AuthStatus } from './const';

const TOASTS_LIMIT = 1;

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

store.dispatch(checkAuth());
store.dispatch(fetchMovies());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer limit={TOASTS_LIMIT} />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
