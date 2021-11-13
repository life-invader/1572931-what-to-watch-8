import {
  movieData,
  defaultState
} from './movie-data-reducer';
import {
  setGenre,
  loadMovies,
  loadFavouriteMovies,
  loadPromoMovie,
  loadCurrentMovie,
  loadSimilarMovies,
  loadComments
} from '../action';
import {
  mockGenre,
  createMockMovie,
  createMockMovies,
  createMockComments
} from '../../mocks/movies-data';

const mockMovie = createMockMovie();
const mockMovies = createMockMovies();
const mockComments = createMockComments();

describe('Tests for movie data reducers', () => {
  it('should set current genre', () => {
    expect(movieData(defaultState, setGenre(mockGenre)))
      .toEqual({
        ...defaultState,
        genre: mockGenre,
      });
  });

  it('should set all movies', () => {
    expect(movieData(defaultState, loadMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        movies: mockMovies,
      });
  });

  it('should set favourite movies', () => {
    expect(movieData(defaultState, loadFavouriteMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        favouriteMovies: mockMovies,
      });
  });

  it('should set promo movie', () => {
    expect(movieData(defaultState, loadPromoMovie(mockMovie)))
      .toEqual({
        ...defaultState,
        promoMovie: mockMovie,
      });
  });

  it('should set current movie', () => {
    expect(movieData(defaultState, loadCurrentMovie(mockMovie)))
      .toEqual({
        ...defaultState,
        currentMovie: mockMovie,
      });
  });

  it('should set similar movies', () => {
    expect(movieData(defaultState, loadSimilarMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        similarMovies: mockMovies,
      });
  });

  it('should set current movie comments', () => {
    expect(movieData(defaultState, loadComments(mockComments)))
      .toEqual({
        ...defaultState,
        comments: mockComments,
      });
  });

});
