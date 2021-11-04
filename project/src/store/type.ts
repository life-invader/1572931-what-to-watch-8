import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ActionType } from '../const';
import type { RootState } from './root-reducer';

export type AuthData = {
  email: string,
  password: string,
};

export type setGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type setDefaultGenreAction = {
  type: ActionType.DefaultGenre,
  payload: string,
}

export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
