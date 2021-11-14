import {
  movieDataReducer,
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
    expect(movieDataReducer(defaultState, setGenre(mockGenre)))
      .toEqual({
        ...defaultState,
        genre: mockGenre,
      });
  });

  it('should set all movies', () => {
    expect(movieDataReducer(defaultState, loadMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        movies: mockMovies,
      });
  });

  it('should set favourite movies', () => {
    expect(movieDataReducer(defaultState, loadFavouriteMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        favouriteMovies: mockMovies,
      });
  });

  it('should set promo movie', () => {
    expect(movieDataReducer(defaultState, loadPromoMovie(mockMovie)))
      .toEqual({
        ...defaultState,
        promoMovie: mockMovie,
      });
  });

  it('should set current movie', () => {
    expect(movieDataReducer(defaultState, loadCurrentMovie(mockMovie)))
      .toEqual({
        ...defaultState,
        currentMovie: mockMovie,
      });
  });

  it('should set similar movies', () => {
    expect(movieDataReducer(defaultState, loadSimilarMovies(mockMovies)))
      .toEqual({
        ...defaultState,
        similarMovies: mockMovies,
      });
  });

  it('should set current movie comments', () => {
    expect(movieDataReducer(defaultState, loadComments(mockComments)))
      .toEqual({
        ...defaultState,
        comments: mockComments,
      });
  });

});
