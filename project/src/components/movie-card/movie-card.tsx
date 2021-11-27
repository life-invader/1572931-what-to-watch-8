import {
  useEffect,
  useRef,
  useState
} from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import VideoPlayer from '../video-player/video-player';
import { MovieCardType } from './type';

const TIMER_DELAY = 1000;

function MovieCard({ movie }: MovieCardType): JSX.Element {
  const { 'preview_image': previewImage, name, id, 'preview_video_link': previewVideoLink } = movie;
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    clearTimer();
    if (!hover) {
      setPlay(false);
    }
    if (hover) {
      timer.current = setTimeout(() => setPlay(true), TIMER_DELAY);
    }
    return clearTimer;
  }, [hover]);

  return (
    <article data-testid='movie-card' className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      {
        play ?
          <VideoPlayer data-testid='player' previewVideoLink={previewVideoLink} previewImage={previewImage} />
          :
          <div className="small-film-card__image">
            <img src={previewImage} alt="Macbeth" width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoutes.Movie(id)}>{name}</Link>
      </h3>
    </article>
  );
}

export default MovieCard;
