import {
  Router as BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import Movie from '../movie/movie';
import MyList from '../my-list/my-list';
import Page404 from '../page-404/page-404';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import SpinnerMainPage from '../spinner/spinner-main-page/spinner-main-page';
import browserHistory from '../../browser-history';
import { AppRoutes, AuthStatus, PrivateRouteActionType } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors/user-process';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <SpinnerMainPage />;
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoutes.MainPage()}>
          <MainPage />
        </Route>
        <PrivateRoute exact path={AppRoutes.SignIn()} actionType={PrivateRouteActionType.Guest} >
          <SignIn />
        </PrivateRoute>
        <PrivateRoute exact path={AppRoutes.MyList()} actionType={PrivateRouteActionType.User} >
          <MyList />
        </PrivateRoute>
        <Route exact path={AppRoutes.Movie()}>
          <Movie />
        </Route>
        <PrivateRoute exact path={AppRoutes.AddReview()} actionType={PrivateRouteActionType.User} >
          <AddReview />
        </PrivateRoute>
        <Route exact path={AppRoutes.Player()}>
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
