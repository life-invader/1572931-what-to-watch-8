export enum AppRoutes {
  MainPage = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Movie = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Films = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  similar = '/similar'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ActionType {
  ChangeGenre = 'change-genre',
  SetCurrentMovie = 'set-current-movie',
  LoadMovies = 'load-movies',
  RequireAuthorization = 'require-authoization',
  RequireLogout = 'require-logout',
  Redirect = 'redirect',
  GetData = 'get-data',
}

export enum Genres {
  AllGenres = 'All genres',
}

export enum Tabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}
