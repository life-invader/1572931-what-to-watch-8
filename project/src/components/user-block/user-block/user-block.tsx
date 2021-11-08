import { useSelector } from 'react-redux';
import { AuthStatus } from '../../../const';
import { getAuthorizationStatus } from '../../../store/selectors/user-process';
import UserBlockLoggedIn from '../user-block-logged-in/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block-not-logged-in/user-block-not-logged-in';

function UserBlock(): JSX.Element {
  const auth = useSelector(getAuthorizationStatus);

  switch (auth) {
    case AuthStatus.Auth:
      return (
        <UserBlockLoggedIn />
      );
    default:
      return (
        <UserBlockNotLoggedIn />
      );
  }
}

export default UserBlock;
