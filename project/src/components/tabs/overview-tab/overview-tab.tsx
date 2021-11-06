import { OverviewTabType } from '../type';

export interface TabTypeProps extends OverviewTabType {
  title?: string;
}

enum Ratings {
  Bad = 0,
  Normal = 3,
  Good = 5,
  'Very good' = 8,
  Awesome = 10,
}

const getRatingDescription = (rating: number) => {
  // Развернул массив, чтобы в цикле идти от большего к меньшему;
  const descriptions = Object.keys(Ratings).reverse() as Array<keyof typeof Ratings>;
  for (const item of descriptions) {
    if (rating >= Ratings[item]) {
      return item;
    }
  }
};

function OverviewTab({ currentMovie }: TabTypeProps): JSX.Element {
  const {
    rating,
    description,
    director,
    starring,
    'scores_count': scoresCount,
  } = currentMovie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(rating)}</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
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
