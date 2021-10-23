/* eslint-disable no-console */
import { ActionType, AuthStatus } from '../const';
import {
  setGenreAction,
  setDefaultGenreAction
} from './type';

export const setGenre = (evt: any): setGenreAction => {
  evt.preventDefault();
  return { type: ActionType.ChangeGenre, payload: evt.target.dataset.genre };
};

export const setDefaultGenre = (evt: any): setDefaultGenreAction => {
  evt.preventDefault();
  return { type: ActionType.DefaultGenre, payload: evt.target.dataset.genre };
};

export const loadMovies = (movies: any) => ({ type: ActionType.LoadMovies, payload: movies });
export const requireAuthorization = (authStatus: AuthStatus) => ({ type: ActionType.RequireAuthorization, payload: authStatus }) as const;
export const requireLogout = () => ({ type: ActionType.RequireLogout }) as const;
