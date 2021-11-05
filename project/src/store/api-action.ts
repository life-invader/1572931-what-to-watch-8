import { loadMovies, requireAuthorization, requireLogout, redirectToRoute, loadCurrentMovie } from './action';
import { AppRoutes, APIRoute, AuthStatus } from '../const';
import { setToken, dropToken } from '../services/token';
import type { MoviesType } from '../types/movies';
import type { ThunkActionResult, AuthData } from './type';

export const fetchMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType[]>(APIRoute.Films);
  dispatch(loadMovies(data));
};

export const checkAuth = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.get(APIRoute.Login);
  dispatch(requireAuthorization(AuthStatus.Auth));
};

export const logIn = ({ email, password }: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data: { token } } = await api.post(APIRoute.Login, { email, password });
  setToken(token);
  dispatch(requireAuthorization(AuthStatus.Auth));
  dispatch(redirectToRoute(AppRoutes.MainPage));
};

export const logOut = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireLogout());
};

export const fetchMovie = (id: string): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(`${APIRoute.Films}/${id}`);
    dispatch(loadCurrentMovie(data));
  } catch {
    dispatch(redirectToRoute(AppRoutes.NotFound));
  }
};
