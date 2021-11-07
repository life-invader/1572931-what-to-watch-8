import {
  loadMovies,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loadCurrentMovie,
  loadComments,
  loadSimilarMovies,
  loadPromoMovie,
  loadFavouriteMovies,
  setNewCommentStatus,
  setUserInfo
} from './action';
import {
  AppRoutes,
  APIRoute,
  AuthStatus,
  NewComemntStatus
} from '../const';
import {
  setToken,
  dropToken
} from '../services/token';
import { toast } from 'react-toastify';
import { NameSpace } from './root-reducer';
import type { MoviesType } from '../types/movies';
import type {
  ThunkActionResult,
  AuthData
} from './type';
import type { CommentType } from '../types/movies';

export const fetchMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType[]>(APIRoute.Films());
  dispatch(loadMovies(data));
};

export const fetchFavouriteMovies = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  try {
    const { data } = await api.get<MoviesType[]>(APIRoute.Favourite());
    dispatch(loadFavouriteMovies(data));
  } catch {
    toast.error('Не удалось загрузить любимые фильмы!', { position: toast.POSITION.TOP_LEFT });
  }
};

export const fetchPromoMovie = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<MoviesType>(APIRoute.Promo());
  dispatch(loadPromoMovie(data));
};

export const checkAuth = (): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(APIRoute.Login());
    dispatch(setUserInfo(data));
    dispatch(requireAuthorization(AuthStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
};

export const logIn = ({ email, password }: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.post(APIRoute.Login(), { email, password });
    setToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(setUserInfo(data));
    dispatch(redirectToRoute(AppRoutes.MainPage()));
  } catch {
    toast.error('Ошибка авторизации', { position: toast.POSITION.TOP_LEFT });
  }
};

export const logOut = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.delete(APIRoute.Logout());
  dropToken();
  dispatch(requireLogout());
};

export const fetchMovie = (id: string): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(APIRoute.Film(id));
    dispatch(loadCurrentMovie(data));
  } catch {
    dispatch(redirectToRoute(AppRoutes.NotFound()));
  }
};

export const fetchComments = (id: string): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(APIRoute.Comments(id));
    dispatch(loadComments(data));
  } catch {
    toast.error('Не удалось загрузить комментарии!', { position: toast.POSITION.TOP_LEFT });
  }
};

export const postComment = (id: string, newComment: CommentType): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setNewCommentStatus(NewComemntStatus.Loading));

  try {
    const { data } = await api.post(APIRoute.Comments(id), newComment);
    dispatch(loadComments(data));
    dispatch(setNewCommentStatus(NewComemntStatus.Idle));
    dispatch(redirectToRoute(APIRoute.Film(id)));
  } catch {
    dispatch(setNewCommentStatus(NewComemntStatus.Idle));
    toast.error('Не удалось отправить комментарий!', { position: toast.POSITION.TOP_LEFT });
  }
};

export const fetchSimilarMovies = (id: string): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(APIRoute.Similar(id));
    dispatch(loadSimilarMovies(data));
  } catch {
    toast.error('Не удалось загрузить похожие фильмы!', { position: toast.POSITION.TOP_LEFT });
  }
};

export const changeFavouriteKeyStatus = (id: number, status: number): ThunkActionResult => async (dispatch, getState, api) => {
  try {
    const { data } = await api.post(APIRoute.FavouriteStatus(id, status));

    if (getState()[NameSpace.Data].promoMovie.id === id) {
      dispatch(loadPromoMovie(data));
    }

    if (getState()[NameSpace.Data].currentMovie.id === id) {
      dispatch(loadCurrentMovie(data));
    }
  } catch {
    if (status) {
      toast.error('Не удалось добавить в избранное', { position: toast.POSITION.TOP_LEFT });
    }
    toast.error('Не удалось удалить из избранного', { position: toast.POSITION.TOP_LEFT });
  }
};
