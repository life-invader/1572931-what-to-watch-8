import { Router as BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import browserHistory from '../../browser-history';
import Page404 from './page-404';

describe('Component: Page404', () => {
  it('renders Page404 component', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <Page404 />
      </BrowserRouter>);

    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
