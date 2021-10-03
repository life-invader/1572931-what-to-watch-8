import MainPage from '../main-page/main-page';
import type {AppMovieCardProps} from './type';

function App({promoMovieInfo}: AppMovieCardProps): JSX.Element {
  const {
    name,
    release,
    genre,
  } = promoMovieInfo;

  return <MainPage name={name} release={release} genre={genre} />;
}

export default App;
