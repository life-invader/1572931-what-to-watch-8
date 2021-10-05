import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Movie from '../movie/movie';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import type {AppMovieCardProps} from './type';
import {AppRoutes} from '../../const';


function App({promoMovieInfo}: AppMovieCardProps): JSX.Element {
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
        <Route exact path={AppRoutes.MyList}>
          <MyList />
        </Route>
        <Route exact path={AppRoutes.Movie}>
          <Movie />
        </Route>
        <Route exact path={AppRoutes.AddReview}>
          <AddReview />
        </Route>
        <Route exact path={AppRoutes.Player}>
          <Player />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
