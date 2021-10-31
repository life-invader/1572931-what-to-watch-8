/* eslint-disable react/no-unused-prop-types */
import type { MoviesType } from '../../types/movies';
import { formatRuntime } from '../../utils/utils';


type Type = {
  title: string,  //TS ругается на неиспользуемую пременную, но она используется не здесь, а в <TabContainer /> в children.map();
  currentMovie: MoviesType,
}

function DetailsTab({ currentMovie }: Type): JSX.Element {
  const {
    'run_time': runtime,
    director,
    starring,
    genre,
    released,
  } = currentMovie;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.join(', ')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatRuntime(runtime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default DetailsTab;
