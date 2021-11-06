import { NameSpace } from '../root-reducer';
import type { State } from '../../store/type';
import type { MoviesType, UserCommentType } from '../../types/movies';

export const getMovies = (state: State): MoviesType[] => state[NameSpace.Data].movies;
export const getCurrentMovie = (state: State): MoviesType => state[NameSpace.Data].currentMovie;
export const getPromoMovie = (state: State): MoviesType => state[NameSpace.Data].promoMovie;
export const getSimilarMovies = (state: State): MoviesType[] => state[NameSpace.Data].similarMovies;
export const getComments = (state: State): UserCommentType[] => state[NameSpace.Data].comments;
export const getCurrentGenre = (state: State): string => state[NameSpace.Data].genre;
