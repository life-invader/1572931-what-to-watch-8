import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthStatus, AppRoutes } from '../const';
import type { MoviesType, UserCommentType } from '../types/movies';

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

export const loadPromoMovie = createAction(ActionType.LoadPromoMovie, (promoMovie: MoviesType) => ({
  payload: {
    promoMovie,
  },
}));

export const loadSimilarMovies = createAction(ActionType.LoadSimilarMovies, (similarMovies: MoviesType[]) => ({
  payload: {
    similarMovies,
  },
}));


export const loadComments = createAction(ActionType.LoadComments, (comments: UserCommentType[]) => ({
  payload: {
    comments,
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
