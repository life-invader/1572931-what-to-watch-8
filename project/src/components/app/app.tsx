import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import Movie from '../movie/movie';
import MyList from '../my-list/my-list';
import Page404 from '../page-404/page-404';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import {
  AppRoutes,
  AuthStatus
} from '../../const';
import type { AppMovieCardProps } from './type';

function App({ promoMovieInfo, movies }: AppMovieCardProps): JSX.Element {
  const {
    name,
    release,
    genre,
  } = promoMovieInfo;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoutes.MainPage}>
          <MainPage name={name} release={release} genre={genre} />
        </Route>
        <Route exact path={AppRoutes.SignIn}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoutes.MyList} AuthorizationStatus={AuthStatus.Auth}>
          <MyList movies={movies} />
        </PrivateRoute>
        <Route exact path={AppRoutes.Movie}>
          <Movie movies={movies} />
        </Route>
        <Route exact path={AppRoutes.AddReview}>
          <AddReview movies={movies} />
        </Route>
        <Route exact path={AppRoutes.Player}>
          <Player />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
