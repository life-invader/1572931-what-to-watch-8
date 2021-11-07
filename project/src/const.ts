export const AppRoutes = {
  MainPage: (): string => '/',
  SignIn: (): string => '/login',
  MyList: (): string => '/mylist',
  Movie: (id: string | number = ':id'): string => `/films/${id}`,
  AddReview: (id: string | number = ':id'): string => `/films/${id}/review`,
  Player: (id: string | number = ':id'): string => `/player/${id}`,
  NotFound: (): string => '/404',
} as const;

export const APIRoute = {
  Film: (id: string | number): string => `/films/${id}`,
  Films: (): string => '/films',
  Comments: (id: string | number): string => `/comments/${id}`,
  Favourite: (): string => '/favorite',
  FavouriteStatus: (id: string | number, status: number): string => `/favorite/${id}/${status}`,
  Promo: (): string => '/promo',
  Login: (): string => '/login',
  Logout: (): string => '/logout',
  Similar: (id: string | number): string => `/films/${id}/similar`,
};

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
