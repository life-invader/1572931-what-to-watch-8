import {VideoPlayerProps} from './type';

function VideoPlayer({previewVideoLink, previewImage}: VideoPlayerProps): JSX.Element {
  return (
    <video autoPlay muted src={previewVideoLink} className="player__video" poster={previewImage}></video>
  );
}

export default VideoPlayer;
