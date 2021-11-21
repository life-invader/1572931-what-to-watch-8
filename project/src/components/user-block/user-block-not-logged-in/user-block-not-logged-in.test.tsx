import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../../browser-history';
import UserBlockNotLoggedIn from './user-block-not-logged-in';

describe('Component: UserBlockNotLoggedIn', () => {
  it('renders UserBlockNotLoggedIn component', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <UserBlockNotLoggedIn />
      </BrowserRouter>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
