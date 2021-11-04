import type { MoviesType } from '../../types/movies';

export type MovieData = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
  currentMovie: MoviesType,
}
