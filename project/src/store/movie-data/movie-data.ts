import { Genres } from '../../const';
import { ActionType } from '../../const';
import type { Action } from '../type';
import type { MoviesType } from '../../types/movies';
import type { MovieData } from './type';

const defaultState: MovieData = {
  genre: Genres.AllGenres,
  movies: [],
  defaultMovies: [],
  currentMovie: {} as MoviesType,
};

export const movieData = (state = defaultState, action: Action): MovieData => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return { ...state, genre: action.payload, movies: state.defaultMovies.filter((movie) => movie.genre === action.payload) };
    case ActionType.DefaultGenre:
      return { ...state, genre: action.payload, movies: state.defaultMovies };
    case ActionType.SetCurrentMovie:
      return { ...state, currentMovie: action.payload };
    case ActionType.LoadMovies:
      return { ...state, movies: action.payload, defaultMovies: action.payload };
    default:
      return state;
  }
};
