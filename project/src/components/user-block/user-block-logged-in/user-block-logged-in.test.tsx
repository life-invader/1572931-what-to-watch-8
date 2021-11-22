import { render, screen } from '@testing-library/react';
import UserBlockLoggedIn from './user-block-logged-in';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../store/type';

const mockStore = configureMockStore<State>();
const store = mockStore({
  User: {
    userInfo: {
      id: 1,
      email: 'mockfake@ya.ru',
      name: 'jack',
      'avatar_url': 'hfnsduft2342837',
      token: '3873dfds',
    },
  },
});

describe('Component: UserBlockLoggedIn', () => {
  it('renders UserBlockLoggedIn component', () => {
    render(
      <Provider store={store}>
        <UserBlockLoggedIn />
      </Provider>);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
