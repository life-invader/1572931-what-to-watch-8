import { loadMovies } from './action';
import { APIRoute } from '../const';
import type { MoviesType } from '../types/movies';
import type { ThunkActionResult } from './type';

export const fetchMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType[]>(APIRoute.Films);
  dispatch(loadMovies(data));
};
