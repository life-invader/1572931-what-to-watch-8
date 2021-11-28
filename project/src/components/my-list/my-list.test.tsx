import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import MyList from './my-list';
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
    favouriteMovies: mockMovies,
  },
  User: {
    authorizationStatus: AuthStatus.NoAuth,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: MyList', () => {
  it('renders MyList component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <MyList />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(store.dispatch).toBeCalledTimes(1);
  });
});
