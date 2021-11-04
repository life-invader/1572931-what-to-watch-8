import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ActionType } from '../const';
import type { MovieData } from './movie-data/type';
import type { UserProcess } from './user-process/type';
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
  Data: MovieData,
  User: UserProcess,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
