import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { State, UserInfo } from '../../store/type';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AppRoutes, AuthStatus, Genres, NewCommentStatus } from '../../const';
import { createMockMovie, createMockMovies } from '../../mocks/movies-data';

const mockMovie = createMockMovie();
const mockMovies = createMockMovies();
const mockMovieId = 1;

const mockStore = configureMockStore<State>();
const storeAuth = mockStore({
  User: {
    authorizationStatus: AuthStatus.Auth,
    newCommentStatus: NewCommentStatus.Idle,
    userInfo: {} as UserInfo,
  },
  Data: {
    genre: Genres.AllGenres,
    movies: mockMovies,
    favouriteMovies: [],
    promoMovie: mockMovie,
    currentMovie: mockMovie,
    similarMovies: [],
    comments: [],
  },
});

const storeUnAuth = mockStore({
  User: {
    authorizationStatus: AuthStatus.NoAuth,
    newCommentStatus: NewCommentStatus.Idle,
    userInfo: {} as UserInfo,
  },
  Data: {
    genre: Genres.AllGenres,
    movies: mockMovies,
    favouriteMovies: [],
    promoMovie: mockMovie,
    currentMovie: mockMovie,
    similarMovies: [],
    comments: [],
  },
});

storeAuth.dispatch = jest.fn();
storeUnAuth.dispatch = jest.fn();
const history = createMemoryHistory();

const fakeAppAuth = (
  <Provider store={storeAuth}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

const fakeAppUnAuth = (
  <Provider store={storeUnAuth}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

describe('Application routing', () => {
  it('should render "main-page" component when user navigate to "/"', () => {
    history.push(AppRoutes.MainPage());
    render(fakeAppAuth);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render "SignIn" component when user navigate to "/login" if its not logged in', () => {
    history.push(AppRoutes.SignIn());
    render(fakeAppUnAuth);

    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('should render "MyList" component when user navigate to "/mylist" if its logged in', () => {
    history.push(AppRoutes.MyList());
    render(fakeAppAuth);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render "Movie" component when user navigate to "/films/:id"', () => {
    history.push(AppRoutes.Movie(mockMovieId));
    render(fakeAppAuth);

    expect(screen.queryByTestId('movie-page')).toBeInTheDocument();
  });

  it('should render "AddReview" component when user navigate to "/films/:id/review"', () => {
    history.push(AppRoutes.AddReview(mockMovieId));
    render(fakeAppAuth);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "AddReview" component when user navigate to "/player/:id"', () => {
    history.push(AppRoutes.Player(mockMovieId));
    render(fakeAppAuth);

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render "Page-404" component when user navigate to unexisting route', () => {
    history.push('/some-route');
    render(fakeAppAuth);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
