import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import MainPage from './main-page';
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
  },
  User: {
    authorizationStatus: AuthStatus.NoAuth,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: MainPage', () => {
  it('renders MainPage component', () => {
    browserHistory.push('/films/2'); // Для хука useParams

    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <MainPage />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('fetch promo movie and load to store', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <MainPage />
        </BrowserRouter>
      </Provider>);

    expect(store.dispatch).toBeCalledTimes(1);
  });
});
