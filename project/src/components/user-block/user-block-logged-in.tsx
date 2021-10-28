import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/api-action';

function UserBlockLoggedIn(): JSX.Element {
  const dispatch = useDispatch();
  const logoutButtonClickHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logOut());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={logoutButtonClickHandler}>Sign out</a>
      </li>
    </ul>
  );
}

export default UserBlockLoggedIn;
