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
import TabContainer from '../tabs/tab-container';
import OverviewTab from '../tabs/overview-tab';
import DetailsTab from '../tabs/details-tab';
import ReviewTab from '../tabs/reviews';
import MovieList from '../movie-list/movie-list';
import { loadCurrentMovie } from '../../store/action';
import { URL } from '../../services/api';
import { AppRoutes, APIRoute, AuthStatus, Tabs } from '../../const';
import type { ParamsType } from './type';
import type { State } from '../../store/type';
import type { MoviesType, UserCommentType } from '../../types/movies';

const SIMILAR_MOVIES_COUNT = 4;

function Movie(): JSX.Element | null {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentMovie = useSelector(({ Data }: State) => Data.currentMovie);
  const auth = useSelector(({ User }: State) => User.authorizationStatus);
  const [currentMovieComments, setCurrentMovieComments] = useState<UserCommentType[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MoviesType[]>([]);
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

  if (Object.keys(currentMovie).length === 0) {
    return null;
  }

  const {
    released,
    genre,
    name,
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

              <TabContainer >
                <OverviewTab title={Tabs.Overview} currentMovie={currentMovie} currentMovieComments={currentMovieComments} />
                <DetailsTab title={Tabs.Details} currentMovie={currentMovie} />
                <ReviewTab title={Tabs.Reviews} currentMovieComments={currentMovieComments} />
              </TabContainer>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList movies={similarMovies} moviesCount={SIMILAR_MOVIES_COUNT} />

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
