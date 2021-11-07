import './spinner-player.css';

function SpinnerPlayer(): JSX.Element {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>

  );
}

export default SpinnerPlayer;
