import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  loadMovies,
  loadCurrentMovie,
  loadComments,
  loadSimilarMovies,
  loadPromoMovie,
  loadFavouriteMovies
} from '../action';
import { Genres } from '../../const';
import type { MoviesType } from '../../types/movies';
import type { MovieData } from './type';

export const defaultState: MovieData = {
  genre: Genres.AllGenres,
  movies: [],
  favouriteMovies: [],
  promoMovie: {} as MoviesType,
  currentMovie: {} as MoviesType,
  similarMovies: [],
  comments: [],
};

export const movieData = createReducer(defaultState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(loadMovies, (state, action) => {
      state.movies = action.payload.movies;
    })
    .addCase(loadFavouriteMovies, (state, action) => {
      state.favouriteMovies = action.payload.favouriteMovies;
    })
    .addCase(loadPromoMovie, (state, action) => {
      state.promoMovie = action.payload.promoMovie;
    })
    .addCase(loadCurrentMovie, (state, action) => {
      state.currentMovie = action.payload.movie;
    })
    .addCase(loadSimilarMovies, (state, action) => {
      state.similarMovies = action.payload.similarMovies;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload.comments;
    });
});
