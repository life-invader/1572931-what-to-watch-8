import { useSelector } from 'react-redux';
import { AuthStatus } from '../../../const';
import { getAuthorizationStatus } from '../../../store/selectors/user-process';
import UserBlockLoggedIn from '../user-block-logged-in/user-block-logged-in';
import UserBlockNotLoggedIn from '../user-block-not-logged-in/user-block-not-logged-in';

function UserBlock(): JSX.Element {
  const auth = useSelector(getAuthorizationStatus);

  // Почему switch-case ? Сначала хотел так:
  // return (
  //   {auth === AuthStatus.Auth ? <UserBlockLoggedIn /> : <UserBlockNotLoggedIn />}
  // )
  //
  // Выдал ошибку: This condition will always return 'false' since the types have no overlap. Откуда берется, хз.

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
