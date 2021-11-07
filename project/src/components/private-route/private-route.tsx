import { useSelector } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/selectors/user-process';
import {
  AppRoutes,
  AuthStatus,
  PrivateRouteActionType
} from '../../const';
import type { PrivateRouteType } from './type';

function PrivateRoute({ children, exact, path, actionType }: PrivateRouteType): JSX.Element {
  const auth = useSelector(getAuthorizationStatus);

  switch (actionType) {
    case PrivateRouteActionType.User:
      return (
        <Route exact={exact} path={path}>
          {auth === AuthStatus.Auth ? children : <Redirect to={AppRoutes.SignIn()} />}
        </Route>
      );
    case PrivateRouteActionType.Guest:
      return (
        <Route exact={exact} path={path}>
          {auth === AuthStatus.NoAuth ? children : <Redirect to={AppRoutes.MainPage()} />}
        </Route>
      );
  }
}

export default PrivateRoute;
