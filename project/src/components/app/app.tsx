import MainPage from '../main-page/main-page';

type AppMovieCardProps = {
  promoMovieInfo: {
    name: string,
    release: number,
    genre: string
  }
};

function App({promoMovieInfo}: AppMovieCardProps): JSX.Element {
  const {name, release, genre} = promoMovieInfo;
  return <MainPage name={name} release={release} genre={genre} />;
}

export default App;
