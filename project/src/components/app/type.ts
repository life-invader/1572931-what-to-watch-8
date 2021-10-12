import type {MoviesType} from '../../types/movies';

export type AppMovieCardProps = {
  promoMovieInfo: {
    name: string,
    release: number,
    genre: string,
  },
  movies: MoviesType[],
};
