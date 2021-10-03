import MainPage from '../main-page/main-page';

type AppMovieCardProps = {
  name: string;
};

function App({name}: AppMovieCardProps): JSX.Element {
  return <MainPage name={name}/>;
}

export default App;
