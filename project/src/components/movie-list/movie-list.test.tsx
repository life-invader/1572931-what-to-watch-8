import { render, screen } from '@testing-library/react';
import { createMockMovies } from '../../mocks/movies-data';
import MovieList from './movie-list';
import { Router as BrowserRouter } from 'react-router';
import browserHistory from '../../browser-history';

const moviesCountMock = 8;
const moviesMock = createMockMovies();

describe('Component: MovieList', () => {
  it('renders MovieList component', () => {
    render(
      <BrowserRouter history={browserHistory}>
        <MovieList movies={moviesMock} moviesCount={moviesCountMock} />
      </BrowserRouter>);

    expect(screen.queryByTestId('movie-list')).toBeInTheDocument();
  });
});
