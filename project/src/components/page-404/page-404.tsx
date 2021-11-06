import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import './page-404.css';

function Page404(): JSX.Element {
  return (
    <>
      <Link to={AppRoutes.MainPage} className="return">Вернуться на главную</Link>
      <div className="numberError">
        <h1 className="error" data-text="404">404</h1>
      </div>
    </>
  );
}

export default Page404;
