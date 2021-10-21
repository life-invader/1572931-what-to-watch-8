import { mockMovies, Genres } from '../mocks/films';
import { ActionType } from '../const';
import type { Action, State } from './type';

const defaultState = {
  genre: Genres.AllGenres,
  movies: mockMovies,
  defaultMovies: mockMovies,
};

export const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return { ...state, genre: action.payload, movies: mockMovies.filter((movie) => movie.genre === action.payload) };
    case ActionType.DefaultGenre:
      return { ...state, genre: action.payload, movies: mockMovies };
    default:
      return state;
  }
};
