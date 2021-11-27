import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../browser-history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import SignIn from './sign-in';
import { State } from '../../store/type';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore<State>();
const store = mockStore({});
store.dispatch = jest.fn();

const mockEmail = 'fakemock@ya.ru';
const mockPassword = '123qwe';

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

  it('should handle sign in action', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <SignIn />
        </BrowserRouter>
      </Provider>);

    userEvent.type(screen.getByTestId('test-email'), mockEmail);
    userEvent.type(screen.getByTestId('test-password'), mockPassword);

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(store.dispatch).toBeCalled();
  });
});
