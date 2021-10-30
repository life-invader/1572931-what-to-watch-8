import { Middleware } from 'redux';
import { reducer } from './reducer';
import browserHistory from '../browser-history';
import { ActionType } from '../const';

export const redirect: Middleware<unknown, typeof reducer> = (_store) => (dispatch) => (action) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};
