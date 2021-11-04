import { Middleware } from 'redux';
import { rootReducer } from './root-reducer';
import browserHistory from '../browser-history';
import { ActionType } from '../const';

export const redirect: Middleware<unknown, typeof rootReducer> = (_store) => (dispatch) => (action) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};
