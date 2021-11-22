import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import AddComment from './add-comment';
import { State } from '../../store/type';
import { NewCommentStatus } from '../../const';

const mockStore = configureMockStore<State>();
const store = mockStore({
  User: {
    newCommentStatus: NewCommentStatus.Idle,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: AddComment', () => {
  it('renders AddComment component', () => {
    browserHistory.push('/films/2'); // Для хука useParams

    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <AddComment />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Rating 10')).toBeInTheDocument();
    expect(screen.getByText('Rating 5')).toBeInTheDocument();
    expect(screen.getByText('Rating 1')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
