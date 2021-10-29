import { Genres } from '../const';
import { ActionType, AuthStatus } from '../const';
import type {
  Action,
  State
} from './type';

const defaultState = {
  genre: Genres.AllGenres,
  movies: [],
  defaultMovies: [],
  authorizationStatus: AuthStatus.Unknown, // authorizationStatus - пока не используется;
};

// reducer принимает 2 параметра.
// 1) state это объект, с ключами: genre - текущий жанр; movies - массив, содержащий объекты, каждый объект содержит инфу про кино, фильтруется при смене жанра;
//    defaultMovies - то же что и movies, но никогда не изменяется, отдается в случае сброса текущего жанра на дефолт, т.е. на 'все жанры'.
//    authorizationStatus - статус авторизации.
// 2) Action - объект с двумя значениями - тип действия и полезная нагрузка, тип ChangeGenre - приходит при смене жанра на любой, кроме дефолтного, тип DefaultGenre - при смене на дефолт, т.е. на 'все жанры',
//    тип LoadMovies - загружает вильмы при старте, тип RequireAuthorization передает состояние авторизации, тип RequireLogout меняет состояние авторизации на 'неавторизован'.

export const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return { ...state, genre: action.payload, movies: state.defaultMovies.filter((movie) => movie.genre === action.payload) };
    case ActionType.DefaultGenre:
      return { ...state, genre: action.payload, movies: state.defaultMovies };
    case ActionType.LoadMovies:
      return { ...state, movies: action.payload, defaultMovies: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthStatus.NoAuth };
    default:
      return state;
  }
};
