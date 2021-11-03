import { ActionType, AuthStatus, AppRoutes } from '../const';
import {
  setGenreAction,
  setDefaultGenreAction
} from './type';
import type { MoviesType } from '../types/movies';

export const setGenre = (genre: string): setGenreAction => ({ type: ActionType.ChangeGenre, payload: genre }) as const;
export const setDefaultGenre = (genre: string): setDefaultGenreAction => ({ type: ActionType.DefaultGenre, payload: genre }) as const;
export const loadMovies = (movies: MoviesType[]) => ({ type: ActionType.LoadMovies, payload: movies }) as const;
export const loadCurrentMovie = (movie: MoviesType) => ({ type: ActionType.SetCurrentMovie, payload: movie }) as const;
export const requireAuthorization = (authStatus: AuthStatus) => ({ type: ActionType.RequireAuthorization, payload: authStatus }) as const;
export const requireLogout = () => ({ type: ActionType.RequireLogout }) as const;
export const redirectToRoute = (url: AppRoutes | string) => ({ type: ActionType.Redirect, payload: url }) as const;
