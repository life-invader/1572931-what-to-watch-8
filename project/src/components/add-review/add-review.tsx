import {
  Link,
  useParams
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddComment from '../add-comment/add-comment';
import UserBlockLoggedIn from '../user-block/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block/user-block-not-logged-in';
import type { ParamsType } from './type';
import type { State } from '../../store/type';
import {
  AppRoutes,
  AuthStatus
} from '../../const';

function AddReview(): JSX.Element {
  const currentMovie = useSelector((state: State) => state.currentMovie);
  const auth = useSelector((state: State) => state.authorizationStatus);

  const { id }: ParamsType = useParams();

  const {
    name,
    'poster_image': posterImage,
    'background_image': backgroundImage,
  } = currentMovie!;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoutes.MainPage} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          {auth === AuthStatus.Auth ? <UserBlockLoggedIn /> : <UserBlockNotLoggedIn />}

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddComment />
      </div>

    </section>
  );
}

export default AddReview;
