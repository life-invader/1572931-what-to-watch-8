import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Genres } from '../../const';
import { createMockMovies } from '../../mocks/movies-data';
import { State } from '../../store/type';
import { MoviesType } from '../../types/movies';
import GenreLinks from './genre-links';

const resetCurrentAmout = jest.fn();
const mockMovies = createMockMovies();

const mockStore = configureMockStore<State>();
const store = mockStore({
  Data: {
    genre: Genres.AllGenres,
    movies: mockMovies,
    favouriteMovies: [],
    promoMovie: {} as MoviesType,
    currentMovie: {} as MoviesType,
    similarMovies: [],
    comments: [],
  },
});

describe('Component: GenreLinks', () => {
  it('renders GenreLinks component', () => {
    render(
      <Provider store={store}>
        <GenreLinks resetCurrentAmout={resetCurrentAmout} />
      </Provider>);

    const genres = [...new Set(mockMovies.map((movie: MoviesType) => movie.genre))]; // Уникальные жанры без повторений
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
});
