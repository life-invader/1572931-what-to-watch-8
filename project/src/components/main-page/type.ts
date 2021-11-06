import type { MoviesType } from '../../types/movies';

export type RootState = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
}
