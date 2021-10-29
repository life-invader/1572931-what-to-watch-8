import { ActionType, AuthStatus, AppRoutes } from '../const';
import {
  setGenreAction,
  setDefaultGenreAction
} from './type';
import type { MoviesType } from '../types/movies';

export const setGenre = (evt: any): setGenreAction => {
  evt.preventDefault();
  return { type: ActionType.ChangeGenre, payload: evt.target.dataset.genre };
};

export const setDefaultGenre = (evt: any): setDefaultGenreAction => {
  evt.preventDefault();
  return { type: ActionType.DefaultGenre, payload: evt.target.dataset.genre };
};

export const loadMovies = (movies: MoviesType[]) => ({ type: ActionType.LoadMovies, payload: movies }) as const;
export const requireAuthorization = (authStatus: AuthStatus) => ({ type: ActionType.RequireAuthorization, payload: authStatus }) as const;
export const requireLogout = () => ({ type: ActionType.RequireLogout }) as const;
export const redirectToRoute = (url: AppRoutes) => ({type: ActionType.Redirect, payload: url}) as const;
