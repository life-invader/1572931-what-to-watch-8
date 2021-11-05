import type { MoviesType } from '../../types/movies';

export type MainPageMovieCardProps = {
  promoMovie: MoviesType,
};

export type RootState = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
}
