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
  Favourite = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Similar = '/similar',
  Player = '/player',
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
  LoadFavouriteMovies = 'load-favourite-movies',
  LoadPromoMovie = 'load-promo-movie',
  LoadSimilarMovies = 'load-similar-movies',
  LoadComments = 'load-comments',
  RequireAuthorization = 'require-authoization',
  RequireLogout = 'require-logout',
  Redirect = 'redirect',
  GetData = 'get-data',
  SetNewCommentStatus = 'set-new-comment-status',
}

export enum Genres {
  AllGenres = 'All genres',
}

export enum Tabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}


export enum PrivateRouteActionType {
  User = 'User',
  Guest = 'Guest',
}

export enum NewComemntStatus {
  Idle = 'Idle',
  Loading = 'Loading',
}
