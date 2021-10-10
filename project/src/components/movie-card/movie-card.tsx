import {Link} from 'react-router-dom';
import {MovieCardType} from './type';

function MovieCard({movie}: MovieCardType): JSX.Element {
  const {'preview_image': previewImage, name, id} = movie;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={previewImage} alt="Macbeth" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default MovieCard;
