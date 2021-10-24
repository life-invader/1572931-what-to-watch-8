import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ActionType, AuthStatus } from '../const';
import type { MoviesType } from '../types/movies';
import { requireAuthorization, requireLogout, loadMovies } from '../store/action';

export type setGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type setDefaultGenreAction = {
  type: ActionType.DefaultGenre,
  payload: string,
}

export type Action = setGenreAction | setDefaultGenreAction | ReturnType<typeof requireAuthorization> | ReturnType<typeof requireLogout> | ReturnType<typeof loadMovies>;

export type State = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
  authorizationStatus: AuthStatus,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
