import { ActionType, AuthStatus } from '../const';
import type { MoviesType } from '../types/movies';
import { requireAuthorization, requireLogout } from '../store/action';

export type setGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type setDefaultGenreAction = {
  type: ActionType.DefaultGenre,
  payload: string,
}

export type Action = setGenreAction | setDefaultGenreAction | ReturnType<typeof requireAuthorization> | ReturnType<typeof requireLogout> | any;

export type State = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
  authorizationStatus: AuthStatus,
}
