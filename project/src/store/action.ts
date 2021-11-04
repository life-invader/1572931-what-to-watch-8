import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthStatus, AppRoutes } from '../const';
import type { MoviesType } from '../types/movies';

export const redirectToRoute = (url: AppRoutes | string) => ({ type: ActionType.Redirect, payload: url }) as const;

export const setGenre = createAction(ActionType.ChangeGenre, (genre: string) => ({
  payload: {
    genre,
  },
}));

export const loadMovies = createAction(ActionType.LoadMovies, (movies: MoviesType[]) => ({
  payload: {
    movies,
  },
}));

export const loadCurrentMovie = createAction(ActionType.SetCurrentMovie, (movie: MoviesType) => ({
  payload: {
    movie,
  },
}));

export const requireAuthorization = createAction(ActionType.RequireAuthorization, (authStatus: AuthStatus) => ({
  payload: {
    authStatus,
  },
}));

export const requireLogout = createAction(ActionType.RequireLogout);
