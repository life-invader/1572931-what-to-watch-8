import browserHistory from '../browser-history';
import { ActionType } from '../const';

export const redirect: any = (_store: any) => (dispatch: any) => (action: any) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};
