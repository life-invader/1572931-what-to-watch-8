import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../browser-history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import SignIn from './sign-in';
import { State } from '../../store/type';

const mockStore = configureMockStore<State>();
const store = mockStore({});

describe('Component: MovieList', () => {
  it('renders MovieList component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <SignIn />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Email address')).toBeInTheDocument();
  });
});
