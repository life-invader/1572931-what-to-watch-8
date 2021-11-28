import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import AddReview from './add-review';
import { State } from '../../store/type';
import { createMockMovie } from '../../mocks/movies-data';
import { AuthStatus } from '../../const';

const mockMovie = createMockMovie();

const mockStore = configureMockStore<State>();
const store = mockStore({
  Data: {
    currentMovie: mockMovie,
  },
  User: {
    authorizationStatus: AuthStatus.NoAuth,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: AddReview', () => {
  it('renders AddReview component', () => {
    browserHistory.push('/films/2'); // Для хука useParams

    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <AddReview />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('fetch current movie adnd load to store', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <AddReview />
        </BrowserRouter>
      </Provider>);

    expect(store.dispatch).toBeCalledTimes(1);
  });
});
