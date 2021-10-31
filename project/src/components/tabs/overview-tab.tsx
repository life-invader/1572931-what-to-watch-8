/* eslint-disable react/no-unused-prop-types */
import type { MoviesType, UserCommentType } from '../../types/movies';

type Type = {
  title: string, //TS ругается на неиспользуемую пременную, но она используется не здесь, а в <TabContainer /> в children.map();
  currentMovie: MoviesType,
  currentMovieComments: UserCommentType[]
}

function OverviewTab({ currentMovie, currentMovieComments }: Type): JSX.Element {
  const reviewsCount = currentMovieComments.length;
  const {
    rating,
    description,
    director,
    starring,
  } = currentMovie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{`${reviewsCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </>
  );
}

export default OverviewTab;
