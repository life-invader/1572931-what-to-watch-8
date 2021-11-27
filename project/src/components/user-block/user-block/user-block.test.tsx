import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../../browser-history';
import UserBlock from './user-block';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../store/type';
import { AuthStatus } from '../../../const';

const mockStore = configureMockStore<State>();
const storeNotLoggedIn = mockStore({
  User: {
    authorizationStatus: AuthStatus.Unknown,
    userInfo: {
      id: 1,
      email: 'mockfake@ya.ru',
      name: 'jack',
      'avatar_url': 'hfnsduft2342837',
      token: '3873dfds',
    },
  },
});

const storeLoggedIn = mockStore({
  User: {
    authorizationStatus: AuthStatus.Auth,
    userInfo: {
      id: 1,
      email: 'mockfake@ya.ru',
      name: 'jack',
      'avatar_url': 'hfnsduft2342837',
      token: '3873dfds',
    },
  },
});

describe('Component: UserBlock', () => {
  it('renders UserBlock component', () => {
    render(
      <Provider store={storeNotLoggedIn}>
        <BrowserRouter history={browserHistory}>
          <UserBlock />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('renders UserBlock component when logged in', () => {
    render(
      <Provider store={storeLoggedIn}>
        <BrowserRouter history={browserHistory}>
          <UserBlock />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
