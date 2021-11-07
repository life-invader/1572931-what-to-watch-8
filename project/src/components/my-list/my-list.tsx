import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import UserBlockLoggedIn from '../user-block/user-block-logged-in';
import MovieList from '../movie-list/movie-list';
import { getFavouriteMovies } from '../../store/selectors/movie-data';
import { AppRoutes } from '../../const';
import { fetchFavouriteMovies } from '../../store/api-action';

function MyList(): JSX.Element {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector(getFavouriteMovies);

  useEffect(() => {
    dispatch(fetchFavouriteMovies());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoutes.MainPage()} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlockLoggedIn />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <MovieList movies={favouriteMovies} />
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoutes.MainPage()} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2021 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
