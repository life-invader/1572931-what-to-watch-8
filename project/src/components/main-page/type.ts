import type {MoviesType} from '../../types/movies';

export type MainPageMovieCardProps = {
  name: string,
  release: number,
  genre: string,
};

export type RootState = {
  genre: string,
  movies: MoviesType[],
  defaultMovies: MoviesType[],
}
