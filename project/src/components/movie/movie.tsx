/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useParams,
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import UserBlockLoggedIn from '../user-block/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block/user-block-not-logged-in';
import { loadCurrentMovie } from '../../store/action';
import { URL } from '../../services/api';
import { AppRoutes, APIRoute, AuthStatus } from '../../const';
import type { ParamsType } from './type';
import type { State } from '../../store/type';
import type { MoviesType, CommentType } from '../../types/movies';

function Movie(): JSX.Element | null {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentMovie = useSelector((state: State) => state.currentMovie);
  const auth = useSelector((state: State) => state.authorizationStatus);
  const [currentMovieComments, setCurrentMovieComments] = useState<CommentType[] | null>(null); // Комменты не используются, т.к. нет компонента-таба, который их показывает;
  const [similarMovies, setSimilarMovies] = useState<MoviesType[] | null>(null); // Похожие фильмы не используются, т.к. нет компонента-списка фильмов, который их показывает, это делается в другом задании;
  const { id }: ParamsType = useParams();

  useEffect(() => {
    axios.get(`${URL}${APIRoute.Films}/${id}`)
      .then((response) => dispatch(loadCurrentMovie(response.data)))
      .catch(() => history.push('/404'));

    axios.get(`${URL}${APIRoute.Comments}/${id}`)
      .then((response) => setCurrentMovieComments(response.data));

    axios.get(`${URL}${APIRoute.Films}/${id}/similar`)
      .then((response) => setSimilarMovies(response.data));
  }, [dispatch, history, id]);

  if (!currentMovie) {
    return null;
  }

  const {
    released,
    genre,
    name,
    rating,
    description,
    director,
    starring,
    'poster_image': posterImage,
    'background_image': backgroundImage,
  } = currentMovie;

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoutes.MainPage} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            {auth === AuthStatus.Auth ? <UserBlockLoggedIn /> : <UserBlockNotLoggedIn />}
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
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
                {auth === AuthStatus.Auth ? <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">Very good</span>
                  <span className="film-rating__count">240 ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{description}</p>

                <p className="film-card__director"><strong>Director: {director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Aviator</a>
              </h3>
            </article>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

export default Movie;
