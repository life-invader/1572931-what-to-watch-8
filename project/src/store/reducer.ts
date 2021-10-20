import { mockMovies, Genres } from '../mocks/films';

const defaultState = {
  genre: Genres.AllGenres,
  movies: mockMovies,
};

const Actions = {
  ChangeGenre: 'change-genre',
  DefaultGenre: 'all-genres',
};

export const reducer = (state = defaultState, action: any): any => {
  switch (action.type) {
    case Actions.ChangeGenre:
      return { ...state, genre: action.payload, movies: mockMovies.filter((movie) => movie.genre === action.payload) };
    case Actions.DefaultGenre:
      return { ...state, genre: action.payload, movies: mockMovies };
    default:
      return state;
  }
};
