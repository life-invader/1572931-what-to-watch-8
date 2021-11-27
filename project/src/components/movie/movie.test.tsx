import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import Movie from './movie';
import { State } from '../../store/type';
import { createMockMovie, createMockMovies } from '../../mocks/movies-data';
import { AuthStatus } from '../../const';

const mockMovie = createMockMovie();
const mockMovies = createMockMovies();

const mockStore = configureMockStore<State>();
const store = mockStore({
  Data: {
    movies: mockMovies,
    promoMovie: mockMovie,
    currentMovie: mockMovie,
    similarMovies: mockMovies,
  },
  User: {
    authorizationStatus: AuthStatus.NoAuth,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: Movie', () => {
  it('renders Movie component', () => {
    browserHistory.push('/films/2'); // Для хука useParams

    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <Movie />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByTestId('movie-page')).toBeInTheDocument();
    expect(store.dispatch).toBeCalledTimes(3);
  });
});
