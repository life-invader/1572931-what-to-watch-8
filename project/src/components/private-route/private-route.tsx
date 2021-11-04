import { useSelector } from 'react-redux';
import type { State } from '../../store/type';
import {
  Route,
  Redirect
} from 'react-router-dom';
import {
  AppRoutes,
  AuthStatus
} from '../../const';
import type { PrivateRouteType } from './type';

function PrivateRoute(props: PrivateRouteType): JSX.Element {
  const auth = useSelector(({ User }: State) => User.authorizationStatus);
  const { children, exact, path } = props;

  return (
    <Route exact={exact} path={path}>
      {auth === AuthStatus.Auth ? children : <Redirect to={AppRoutes.SignIn} />}
    </Route>
  );
}

export default PrivateRoute;
