import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ActionType, AuthStatus } from '../const';
import type { MoviesType } from '../types/movies';
import { requireAuthorization, requireLogout, loadMovies, redirectToRoute, loadCurrentMovie } from './action';

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

export type Action = setGenreAction | setDefaultGenreAction | ReturnType<typeof requireAuthorization> | ReturnType<typeof requireLogout> | ReturnType<typeof loadMovies> | ReturnType<typeof redirectToRoute> | ReturnType<typeof loadCurrentMovie>;

export type State = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
  authorizationStatus: AuthStatus,
  currentMovie: MoviesType,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
