import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { createSelector } from 'reselect';
import MovieList from '../movie-list/movie-list';
import GenreLinks from '../genre-links/genre-links';
import Spinner from '../spinner/spinner';
import UserBlockLoggedIn from '../user-block/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block/user-block-not-logged-in';
import MainPageShowMoreButton from '../main-page-show-more-button/main-page-show-more-button';
import { getMovies } from '../../store/selectors/movie-data';
import { getAuthorizationStatus } from '../../store/selectors/user-process';
import { getCurrentGenre } from '../../store/selectors/movie-data';
import {
  AuthStatus,
  Genres
} from '../../const';
import type { MainPageMovieCardProps } from './type';

const MAIN_PAGE_MOVIES_COUNT = 8;
const SHOW_MORE_BUTTON_STEP = 8;

function MainPage({ promoMovie }: MainPageMovieCardProps): JSX.Element {
  const { name, released, genre, 'poster_image': posterImage, 'background_image': backgroundImage, id } = promoMovie;

  const history = useHistory();
  const selectFilteredMovies = createSelector(getMovies, getCurrentGenre, (defaultMovies, currentGenre) => {
    if (currentGenre === Genres.AllGenres) {
      return defaultMovies;
    }

    return defaultMovies.filter((movie) => movie.genre === currentGenre);
  });

  const movies = useSelector(selectFilteredMovies);
  const auth = useSelector(getAuthorizationStatus);
  const [currentAmout, setCurrentAmount] = useState(MAIN_PAGE_MOVIES_COUNT);
  const isMoreButtonVisible = movies.length > currentAmout;

  const showMoreButtonClickHandler = () => {
    setCurrentAmount((prevState) => prevState + SHOW_MORE_BUTTON_STEP);
  };

  const resetCurrentAmout = () => {
    setCurrentAmount(MAIN_PAGE_MOVIES_COUNT);
  };

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

          {auth === AuthStatus.Auth ? <UserBlockLoggedIn /> : <UserBlockNotLoggedIn />}

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
                <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(`player/${id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreLinks resetCurrentAmout={resetCurrentAmout} />

          {movies.length > 0 ? <MovieList movies={movies} moviesCount={currentAmout} /> : <Spinner />}

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
