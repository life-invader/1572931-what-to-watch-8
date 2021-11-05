import { NameSpace } from '../root-reducer';
import type { State } from '../../store/type';
import type { MoviesType } from '../../types/movies';

export const getMovies = (state: State): MoviesType[] => state[NameSpace.Data].movies;
export const getCurrentMovie = (state: State): MoviesType => state[NameSpace.Data].currentMovie;
export const getCurrentGenre = (state: State): string => state[NameSpace.Data].genre;
