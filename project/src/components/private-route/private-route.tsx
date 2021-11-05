/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/selectors/user-process';
import {
  AppRoutes,
  AuthStatus
} from '../../const';
import type { PrivateRouteType } from './type';

function PrivateRoute(props: PrivateRouteType): JSX.Element {
  const auth = useSelector(getAuthorizationStatus);
  const { children, exact, path } = props;
  console.log(auth);
  console.log(auth === AuthStatus.Auth);
  return (
    <Route exact={exact} path={path}>
      {auth === AuthStatus.Auth ? children : <Redirect to={AppRoutes.SignIn} />}
    </Route>
  );
}

export default PrivateRoute;
