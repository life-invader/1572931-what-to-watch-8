/* eslint-disable react/no-unused-prop-types */
import { formatHumanizedDate } from '../../utils/utils';
import type { UserCommentType } from '../../types/movies';

type Type = {
  title: string, //TS ругается на неиспользуемую пременную, но она используется не здесь, а в <TabContainer /> в children.map();
  currentMovieComments: UserCommentType[]
}

function ReviewTab({ currentMovieComments }: Type): JSX.Element {
  const firstColumnReviews = currentMovieComments.slice().splice(0, currentMovieComments.length / 2);
  const secondColumnReviews = currentMovieComments.slice().splice(currentMovieComments.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {firstColumnReviews.map((review: UserCommentType) => {
          const { comment, date, id, rating, user: { name } } = review;

          return (
            <div className="review" key={id}>
              <blockquote className="review__quote">
                <p className="review__text">{comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{formatHumanizedDate(date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{rating}</div>
            </div>
          );
        })}

      </div>

      <div className="film-card__reviews-col">

        {secondColumnReviews.map((review: any) => {
          const { comment, date, id, rating, user: { name } } = review;

          return (
            <div className="review" key={id}>
              <blockquote className="review__quote">
                <p className="review__text">{comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{formatHumanizedDate(date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{rating}</div>
            </div>
          );
        })}

      </div>
    </div >
  );
}

export default ReviewTab;
