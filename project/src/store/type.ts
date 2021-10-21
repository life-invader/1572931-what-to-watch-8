import { ActionType } from '../const';
import type {MoviesType} from '../types/movies';

export type setGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type setDefaultGenreAction = {
  type: ActionType.DefaultGenre,
  payload: string,
}

export type Action = setGenreAction | setDefaultGenreAction;

export type State = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
}
