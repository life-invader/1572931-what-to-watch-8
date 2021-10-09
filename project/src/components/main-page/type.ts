import type {MoviesType} from '../../types/movies';

export type MainPageMovieCardProps = {
  name: string,
  release: number,
  genre: string,
  movies: MoviesType[]
};
