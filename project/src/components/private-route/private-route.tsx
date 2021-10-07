import {Route, Redirect} from 'react-router-dom';
import {AppRoutes, AuthStatus} from '../../const';
import type {PrivateRouteType} from './type';

function PrivateRoute(props: PrivateRouteType): JSX.Element {
  const {children, exact, path, AuthorizationStatus} = props;

  return (
    <Route exact={exact} path={path}>
      {AuthorizationStatus === AuthStatus.Auth ? children : <Redirect to={AppRoutes.SignIn} />}
    </Route>
  );
}

export default PrivateRoute;
