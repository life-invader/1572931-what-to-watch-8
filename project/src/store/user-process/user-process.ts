import {
  ActionType,
  AuthStatus
} from '../../const';
import type { Action } from '../type';
import type { UserProcess } from './type';

const defaultState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
};

export const userProcess = (state = defaultState, action: Action): UserProcess => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthStatus.NoAuth };
    default:
      return state;
  }
};
