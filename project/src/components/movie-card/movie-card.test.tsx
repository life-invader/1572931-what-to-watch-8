import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../browser-history';
import MovieCard from './movie-card';
import { createMockMovie } from '../../mocks/movies-data';
import userEvent from '@testing-library/user-event';

const mockMovie = createMockMovie();

describe('Component: MovieCard', () => {
  it('renders MovieCard component', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>);

    expect(screen.getByTestId('movie-card')).toBeInTheDocument();
  });

  it('should trigger hover actions', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>);

    userEvent.hover(screen.getByTestId('movie-card'));
    setTimeout(() => expect(screen.queryByTestId('player')).toBeInTheDocument(), 1000);
  });

  it('should trigger hover actions after mouse left component', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>);

    userEvent.unhover(screen.getByTestId('movie-card'));
    expect(screen.queryByTestId('player')).not.toBeInTheDocument();
  });
});
