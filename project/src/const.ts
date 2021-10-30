export enum AppRoutes {
  MainPage = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Movie = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum APIRoute {
  Films = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ActionType {
  ChangeGenre = 'change-genre',
  DefaultGenre = 'all-genres',
  SetCurrentMovie = 'set-current-movie',
  LoadMovies = 'load-movies',
  RequireAuthorization = 'require-authoization',
  RequireLogout = 'require-logout',
  Redirect = 'redirect',
}

export const Genres = {
  AllGenres: 'All genres',
  Comedies: 'Comedy',
  Crime: 'Crime',
  Documentary: 'Documentary',
  Dramas: 'Dramas',
  Horror: 'Horror',
  KidsNFamily: 'Kids & family',
  Romance: 'Romance',
  SciFi: 'Sci-fi',
  Thrillers: 'Thrillers',
};
