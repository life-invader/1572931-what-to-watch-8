/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { loadMovies, requireAuthorization } from './action';
import { APIRoute, AuthStatus } from '../const';
import type { MoviesType } from '../types/movies';
import type { ThunkActionResult } from './type';

export const fetchMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType[]>(APIRoute.Films);
  dispatch(loadMovies(data));
};

export const checkAuth = () => async (dispatch: any, getState: any, api: any): Promise<any> => {
  api.get(APIRoute.Login)
    .then((response: any) => {
      console.log(response);
      dispatch(requireAuthorization(response.payload));
    });
};
