import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchMovie } from '../../store/api-action';
import { getCurrentMovie } from '../../store/selectors/movie-data';
import { ParamsType } from '../add-review/type';
import { formatRemainingTime } from '../../utils/utils';

const PERCENT_100 = 100;
const VIDEO_4 = 'https://cdn.crello.com/api/media/small/213185836/stock-video-partial-view-young-businesswoman-getting'; // Их видео не работают, взял это

function Player(): JSX.Element {
  const dispatch = useDispatch();
  const { id }: ParamsType = useParams();
  const history = useHistory();
  const currentMovie = useSelector(getCurrentMovie);

  const [currentTime, setCurrentTime] = useState(0); // Значение текущего времени видео, чтобы двигать ползунок, что находится на прогрессБар'е
  const [isReady, setReady] = useState(false); // true, если видео готово к просмотру
  const [isPlay, setPlay] = useState(false); // Нажатие на кнопку play меняет значение на true и срабатывает useEffect, который запускается видео
  const [duration, setDuration] = useState(0); // Длительность видео
  const [remainingTime, setRemainingTime] = useState(0); // Оставшееся до конца видео время

  const videoRef = useRef<HTMLVideoElement>(null);
  const { current: videoElement } = videoRef; // Само видео
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const { current: progressBarElement } = progressBarRef; // Полосочка под видео - прогрессБар

  const play = async (video: HTMLVideoElement) => {
    try {
      await video.play();
    } catch {
      setPlay(false);
    }
  };

  // Эффект получения фильма
  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [id, dispatch]);

  // Эффект, который записывает в стейт длительность фильма (setDuration) и оставшееся до конца видео время (setElapsedTime)
  useEffect(() => {
    if (!isReady || !videoElement) {
      return;
    }

    const videoDuration = Math.round(videoElement.duration);
    setDuration(videoDuration);
    setRemainingTime(videoDuration);
  }, [isReady, videoElement]);

  // Эффект, который запускает и останавливает проигрывание видео
  useEffect(() => {
    if (!videoElement) {
      return;
    }

    if (isPlay) {
      play(videoElement);
      return;
    }

    videoElement.pause();
  }, [isPlay, videoElement]);

  const {
    // 'video_link': videoLink, // Их видео не работают
    'preview_image': previewImage,
  } = currentMovie;

  // Оставшееся время до конца видео или надпись, если данные видео еще не загрузились
  const RemainingMovieTime = isReady ? formatRemainingTime(remainingTime) : 'Loading...';

  const playButtonClickHandler = () => {
    setPlay((prevState) => !prevState);
  };

  const videoProgressHandler = () => {
    if (!videoElement || !progressBarElement) {
      return;
    }

    const currentVideoTime = videoElement.currentTime; // Сколько просмотренно от начала, number. Нужно для заполнения прогрессБар'а
    const currentPercentage = currentVideoTime / duration * PERCENT_100; // Сколько просмотренно от начала, в процентах. Нужно, чтобы двигать ползунок на прогрессБар'е
    const currentRemainingTime = Math.round(duration * (PERCENT_100 - currentPercentage) / PERCENT_100); // Сколько осталось до конца, number. Нужно для отображения оставшегося время до конца видео

    setRemainingTime(currentRemainingTime); // Оставшееся время до конца видео
    setCurrentTime(currentPercentage); // Просмотренное от начала время, в %. Для прогрессБар'а
    progressBarElement.value = currentVideoTime; // Заполнение прогрессБар'а
  };

  const fullscreenButtonClickHandler = () => {
    if (videoElement) {
      videoElement.requestFullscreen();
    }
  };

  const videoLoadedDataHandler = () => {
    setReady(true);
  };

  return (
    <div className="player">

      <video preload='metadata' src={VIDEO_4} className="player__video" poster={previewImage} ref={videoRef}
        onTimeUpdate={videoProgressHandler}
        onLoadedData={videoLoadedDataHandler}
      />

      <button type="button" className="player__exit" onClick={() => history.go(-1)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" max={duration} ref={progressBarRef}></progress>
            <div className="player__toggler" style={{ left: `${currentTime}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{RemainingMovieTime}</div>
        </div>

        <div className="player__controls-row">
          {!isPlay ?
            <button type="button" className="player__play" disabled={!isReady} onClick={playButtonClickHandler}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            :
            <button type="button" className="player__play" disabled={!isReady} onClick={playButtonClickHandler}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>}

          <button type="button" className="player__full-screen" disabled={!isReady} onClick={fullscreenButtonClickHandler}>
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
