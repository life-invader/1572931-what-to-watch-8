import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchMovie } from '../../store/api-action';
import { getCurrentMovie } from '../../store/selectors/movie-data';
import { ParamsType } from '../add-review/type';
import { formatElapsedTime } from '../../utils/utils';

function Player(): JSX.Element {
  const dispatch = useDispatch();
  const { id }: ParamsType = useParams();
  const currentMovie = useSelector(getCurrentMovie);
  const [isPlayingStatus, setIsPlayingStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canPlayStatus, setCanPlayStatus] = useState(false);
  const [movieDuration, setMovieDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [id, dispatch]);

  const {
    'video_link': videoLink,
    'preview_image': previewImage,
  } = currentMovie;

  const timeValueTextContent = canPlayStatus ? formatElapsedTime(Math.round(movieDuration - currentTime)) : 'Loading...';

  const playButtonClickHandler = () => {
    if (videoRef && videoRef.current) {
      if (!canPlayStatus) {
        return;
      }
      if (isPlayingStatus === false) {
        setIsPlayingStatus(true);
        videoRef.current.play();
        return;
      }
      if (isPlayingStatus === true) {
        setIsPlayingStatus(false);
        videoRef.current.pause();
      }
    }
  };

  const videoProgressHandler = () => {
    if (videoRef && videoRef.current) {
      const currentProgress = Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100);
      progressBarRef.current.value = currentProgress;
      setProgress(currentProgress);
      setCurrentTime(videoRef.current?.currentTime);
    }
  };

  const onCanPlayChecker = () => {
    if (videoRef && videoRef.current) {
      setCanPlayStatus(true);
      setMovieDuration(videoRef.current.duration);
    }
  };

  const fullscreenButtonClickHandler = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="player">
      <video preload='metadata' src={videoLink} className="player__video" poster={previewImage} ref={videoRef} onTimeUpdate={videoProgressHandler} onCanPlay={onCanPlayChecker}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100" ref={progressBarRef}></progress>
            <div className="player__toggler" style={{ left: `${progress}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{timeValueTextContent}</div>
        </div>

        <div className="player__controls-row">
          {!isPlayingStatus ?
            <button type="button" className="player__play" onClick={playButtonClickHandler}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            :
            <button type="button" className="player__play" onClick={playButtonClickHandler}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>}

          <button type="button" className="player__full-screen" onClick={fullscreenButtonClickHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div >
  );
}

export default Player;
