import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';

function UserBlockNotLoggedIn(): JSX.Element {
  return (
    <div className="user-block">
      <Link to={AppRoutes.SignIn()} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default UserBlockNotLoggedIn;
