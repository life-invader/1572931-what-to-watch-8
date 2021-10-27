/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { loadMovies, requireAuthorization } from './action';
import { AppRoutes, APIRoute, AuthStatus } from '../const';
import { setToken } from '../services/token';
import { redirectToRoute } from './action';
import type { MoviesType } from '../types/movies';
import type { ThunkActionResult } from './type';

export const fetchMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType[]>(APIRoute.Films);
  dispatch(loadMovies(data));
};

export const checkAuth = () => async (dispatch: any, _getState: any, api: any): Promise<any> => {
  await api.get(APIRoute.Login)
    .then((response: any) => {
      console.log(response);
      dispatch(requireAuthorization(AuthStatus.Auth));
    })
    .catch(() => console.log('Ошибка авторизации'));

};

export const logIn = ({ email, password }: any): ThunkActionResult => (dispatch, _getState, api): any => {
  api.post(APIRoute.Login, { email, password })
    .then((response) => {
      const token = response.data.token;
      setToken(token);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(redirectToRoute(AppRoutes.MainPage));
    });
};
