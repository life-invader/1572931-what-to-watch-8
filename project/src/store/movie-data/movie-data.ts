import { createReducer } from '@reduxjs/toolkit';
import { setGenre, loadMovies, loadCurrentMovie } from '../action';
import { Genres } from '../../const';
import type { MoviesType } from '../../types/movies';
import type { MovieData } from './type';

const defaultState: MovieData = {
  genre: Genres.AllGenres,
  movies: [],
  currentMovie: {} as MoviesType,
};

export const movieData = createReducer(defaultState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(loadMovies, (state, action) => {
      state.movies = action.payload.movies;
    })
    .addCase(loadCurrentMovie, (state, action) => {
      state.currentMovie = action.payload.movie;
    });
});
