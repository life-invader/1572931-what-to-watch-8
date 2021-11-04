import browserHistory from '../browser-history';
import { Middleware } from 'redux';
import { State } from './type';
import { ActionType } from '../const';

export const redirect: Middleware<unknown, State> = (_store) => (dispatch) => (action) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};
