import { VideoPlayerProps } from './type';

function VideoPlayer({ previewVideoLink, previewImage }: VideoPlayerProps): JSX.Element {
  return (
    <video data-testid='video-player' autoPlay muted src={previewVideoLink} className="player__video" poster={previewImage}></video>
  );
}

export default VideoPlayer;
