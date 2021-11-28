/* eslint-disable no-console */
import { createAPI } from '../services/api';
import AxiosMockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { State, AuthData } from './type';
import { APIRoute, AppRoutes, AuthStatus, NewCommentStatus } from '../const';
import { checkAuth, logIn, logOut, fetchMovies, fetchFavouriteMovies, fetchPromoMovie, fetchMovie, fetchSimilarMovies, fetchComments, postComment, changeFavouriteKeyStatus } from './api-action';
import { setUserInfo, requireAuthorization, redirectToRoute, requireLogout, loadMovies, loadFavouriteMovies, loadPromoMovie, loadCurrentMovie, loadSimilarMovies, loadComments, setNewCommentStatus } from './action';
import { createMockUserinfo } from '../mocks/user-data';
import { createMockMovie, createMockMovies, createMockComments } from '../mocks/movies-data';
import { defaultState } from './movie-data/movie-data-reducer';

// Инфа о пользователе, получаемая при авторизации
const mockUserData = createMockUserinfo();
const mockMovie = createMockMovie();
const mockMovies = createMockMovies();
const mockMovieComments = createMockComments();

// User actions
describe('User async actions', () => {
  const onFakeUnAuthorizedCallback = jest.fn(); // Пустая фейковая функция;
  const api = createAPI(onFakeUnAuthorizedCallback);
  const mockApi = new AxiosMockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middleware);

  it('should get authorization status «auth» when server returns 200', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Login())
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      setUserInfo(mockUserData),
      requireAuthorization(AuthStatus.Auth),
    ]);
  });

  it('should get authorization status «notAuth» when server returns 401', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Login())
      .reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthStatus.NoAuth),
    ]);
  });

  it('should log in and redirect', async () => {
    const fakeUserData: AuthData = { email: 'test@jest.ru', password: '123456' };

    const store = mockStore();
    mockApi
      .onPost(APIRoute.Login())
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);
    Storage.prototype.setItem = jest.fn(); // Имитация local storage

    await store.dispatch(logIn(fakeUserData));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthStatus.Auth),
      setUserInfo(mockUserData),
      redirectToRoute(AppRoutes.MainPage()),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', mockUserData.token);
  });

  it('should logout', async () => {
    const store = mockStore();
    mockApi
      .onDelete(APIRoute.Logout())
      .reply(204);

    expect(store.getActions()).toEqual([]);
    Storage.prototype.removeItem = jest.fn(); // Имитация local storage

    await store.dispatch(logOut());

    expect(store.getActions()).toEqual([
      requireLogout(),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

});

// Movie actions
describe('Movie async actions', () => {
  const onFakeUnAuthorizedCallback = jest.fn(); // Пустая фейковая функция;
  const api = createAPI(onFakeUnAuthorizedCallback);
  const mockApi = new AxiosMockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middleware);

  it('should get all movies', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Films())
      .reply(200, mockMovies);

    await store.dispatch(fetchMovies());

    expect(store.getActions()).toEqual([
      loadMovies(mockMovies),
    ]);
  });

  it('should get favourite movies', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Favourite())
      .reply(200, mockMovies);

    await store.dispatch(fetchFavouriteMovies());

    expect(store.getActions()).toEqual([
      loadFavouriteMovies(mockMovies),
    ]);
  });

  it('should get promo movie', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Promo())
      .reply(200, mockMovie);

    await store.dispatch(fetchPromoMovie());

    expect(store.getActions()).toEqual([
      loadPromoMovie(mockMovie),
    ]);
  });

  it('should get current movie on the page we are on', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Film(mockMovie.id))
      .reply(200, mockMovie);

    await store.dispatch(fetchMovie(mockMovie.id));

    expect(store.getActions()).toEqual([
      loadCurrentMovie(mockMovie),
    ]);
  });

  it('should redirect to page 404 if movie page not found', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Film(mockMovie.id))
      .reply(404);

    await store.dispatch(fetchMovie(mockMovie.id));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoutes.NotFound()),
    ]);
  });

  it('should get similar movies', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Similar(mockMovie.id))
      .reply(200, mockMovies);

    await store.dispatch(fetchSimilarMovies(mockMovie.id));

    expect(store.getActions()).toEqual([
      loadSimilarMovies(mockMovies),
    ]);
  });

  it('should change movie favourite status', async () => {
    const store = mockStore({
      Data: {
        ...defaultState,
        currentMovie: mockMovie,
        promoMovie: mockMovie,
      },
    });
    const fakeStatus = 1;

    mockApi
      .onPost(APIRoute.FavouriteStatus(mockMovie.id, fakeStatus))
      .reply(200, mockMovie);

    await store.dispatch(changeFavouriteKeyStatus(mockMovie.id, fakeStatus));

    expect(store.getActions()).toEqual([
      loadPromoMovie(mockMovie),
      loadCurrentMovie(mockMovie),
    ]);
  });

});

// Comment actions
describe('Comments async actions', () => {
  const onFakeUnAuthorizedCallback = jest.fn(); // Пустая фейковая функция;
  const api = createAPI(onFakeUnAuthorizedCallback);
  const mockApi = new AxiosMockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middleware);

  it('should get current movie comments', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Comments(mockMovie.id))
      .reply(200, mockMovieComments);

    await store.dispatch(fetchComments(mockMovie.id));

    expect(store.getActions()).toEqual([
      loadComments(mockMovieComments),
    ]);
  });

  it('should post new comment', async () => {
    const store = mockStore();
    const fakeUserComment = {
      'rating': '10',
      'comment': 'haha, classic',
    };

    mockApi
      .onPost(APIRoute.Comments(mockMovie.id), fakeUserComment)
      .reply(200, mockMovieComments);

    await store.dispatch(postComment(mockMovie.id, fakeUserComment));

    expect(store.getActions()).toEqual([
      setNewCommentStatus(NewCommentStatus.Loading),
      loadComments(mockMovieComments),
      setNewCommentStatus(NewCommentStatus.Idle),
      redirectToRoute(APIRoute.Film(mockMovie.id)),
    ]);
  });

});
