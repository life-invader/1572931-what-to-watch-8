import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import MovieList from '../movie-list/movie-list';
import GenreLinks from '../genre-links/genre-links';
import SpinnerMainPage from '../spinner/spinner-main-page/spinner-main-page';
import UserBlock from '../user-block/user-block/user-block';
import MainPageShowMoreButton from '../main-page-show-more-button/main-page-show-more-button';
import AddToMyListButton from '../add-to-my-list-button/add-to-my-list-button';
import {
  getMovies,
  getPromoMovie
} from '../../store/selectors/movie-data';
import { getCurrentGenre } from '../../store/selectors/movie-data';
import {
  AppRoutes,
  Genres
} from '../../const';
import { fetchPromoMovie } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/selectors/user-process';

const MAIN_PAGE_MOVIES_COUNT = 8;
const SHOW_MORE_BUTTON_STEP = 8;

function MainPage(): JSX.Element {
  const auth = useSelector(getAuthorizationStatus);
  const history = useHistory();
  const dispatch = useDispatch();

  const selectFilteredMovies = createSelector(getMovies, getCurrentGenre, (defaultMovies, currentGenre) => {
    if (currentGenre === Genres.AllGenres) {
      return defaultMovies;
    }

    return defaultMovies.filter((movie) => movie.genre === currentGenre);
  });

  const promoMovie = useSelector(getPromoMovie);
  const movies = useSelector(selectFilteredMovies);
  const [currentAmout, setCurrentAmount] = useState(MAIN_PAGE_MOVIES_COUNT);
  const isMoreButtonVisible = movies.length > currentAmout;

  const { name, released, genre, 'poster_image': posterImage, 'background_image': backgroundImage, id } = promoMovie;

  const showMoreButtonClickHandler = () => {
    setCurrentAmount((prevState) => prevState + SHOW_MORE_BUTTON_STEP);
  };

  const resetCurrentAmout = () => {
    setCurrentAmount(MAIN_PAGE_MOVIES_COUNT);
  };

  useEffect(() => {
    dispatch(fetchPromoMovie());
  }, [auth, dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(AppRoutes.Player(id))}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <AddToMyListButton movie={promoMovie} />

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreLinks resetCurrentAmout={resetCurrentAmout} />

          {movies.length > 0 ? <MovieList movies={movies} moviesCount={currentAmout} /> : <SpinnerMainPage />}

          {isMoreButtonVisible && <MainPageShowMoreButton showMoreButtonClickHandler={showMoreButtonClickHandler} />}

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2021 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
