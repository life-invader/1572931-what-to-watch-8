import type { MoviesType, UserCommentType } from '../../types/movies';

export type MovieData = {
  genre: string,
  movies: MoviesType[],
  promoMovie: MoviesType,
  currentMovie: MoviesType,
  similarMovies: MoviesType[],
  comments: UserCommentType[],
}
