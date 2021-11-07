import {
  Link,
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import AddComment from '../add-comment/add-comment';
import UserBlock from '../user-block/user-block/user-block';
import { getCurrentMovie } from '../../store/selectors/movie-data';
import { fetchMovie } from '../../store/api-action';
import type { ParamsType } from './type';
import { AppRoutes } from '../../const';

function AddReview(): JSX.Element {
  const dispatch = useDispatch();
  const currentMovie = useSelector(getCurrentMovie);
  const { id }: ParamsType = useParams();

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  const {
    name,
    'poster_image': posterImage,
    'background_image': backgroundImage,
    'background_color': backgroundColor,
  } = currentMovie;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: backgroundColor }} >
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoutes.MainPage()} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoutes.Movie(id)} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddComment />
      </div>

    </ section>
  );
}

export default AddReview;
