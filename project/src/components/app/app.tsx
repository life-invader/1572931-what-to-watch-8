import {
  Router as BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import Movie from '../movie/movie';
import MyList from '../my-list/my-list';
import Page404 from '../page-404/page-404';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import browserHistory from '../../browser-history';
import { AppRoutes } from '../../const';
import type { MoviesType } from '../../types/movies';

function App(): JSX.Element {
  const [promoMovie, setPromoMovie] = useState<MoviesType>({} as MoviesType);

  useEffect(() => {
    axios.get('https://8.react.pages.academy/wtw/promo')
      .then((response) => setPromoMovie(response.data));
  }, []);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoutes.MainPage}>
          <MainPage promoMovie={promoMovie} />
        </Route>
        <Route exact path={AppRoutes.SignIn}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoutes.MyList} >
          <MyList />
        </PrivateRoute>
        <Route exact path={AppRoutes.Movie}>
          <Movie />
        </Route>
        <PrivateRoute exact path={AppRoutes.AddReview} >
          <AddReview />
        </PrivateRoute>
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
