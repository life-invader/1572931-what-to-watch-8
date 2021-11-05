import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import type { RootState } from './root-reducer';

export type AuthData = {
  email: string,
  password: string,
};


export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
