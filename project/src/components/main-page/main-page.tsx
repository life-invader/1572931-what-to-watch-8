import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../movie-list/movie-list';
import GenreLinks from '../genre-links/genre-links';
import Spinner from '../spinner/spinner';
import UserBlockLoggedIn from '../user-block/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block/user-block-not-logged-in';
import MainPageShowMoreButton from '../main-page-show-more-button/main-page-show-more-button';
import { AuthStatus } from '../../const';
import type { MainPageMovieCardProps } from './type';
import type { State } from '../../store/type';

const MAIN_PAGE_MOVIES_COUNT = 8;
const SHOW_MORE_BUTTON_STEP = 8;

function MainPage({ name, release, genre }: MainPageMovieCardProps): JSX.Element {
  const movies = useSelector((state: State) => state.movies);
  const auth = useSelector((state: State) => state.authorizationStatus);
  const [currentAmout, setCurrentAmount] = useState(MAIN_PAGE_MOVIES_COUNT);
  const isMoreButtonVisible = movies.length > currentAmout;

  const showMoreButtonClickHandler = () => {
    setCurrentAmount((prevState) => prevState + SHOW_MORE_BUTTON_STEP);
  };

  const resetCurrentAmout = () => {
    setCurrentAmount(MAIN_PAGE_MOVIES_COUNT);
  };

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{release}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
    </React.Fragment>
  );
}

export default MainPage;
