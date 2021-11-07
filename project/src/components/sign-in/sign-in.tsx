import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from '../../store/api-action';
import { AppRoutes } from '../../const';
import { useDispatch } from 'react-redux';

// Одна буква и одна цифра
const regExpPassword = /[A-Za-z0-9]{2}/;
const regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,2}$/;

const EMAIL_ERROR =
  (
    <div className="sign-in__message">
      <p>Please enter a valid email address</p>
    </div>
  );

const PASSWORD_ERROR =
  (
    <div className="sign-in__message">
      <p>Password must contain at least 1 letter and 1 digit</p>
    </div>
  );

enum ErrorTypes {
  PasswordError = 'Password-error',
  EmailError = 'Email-error',
  NoError = 'No-error',
}

function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorType, setErrorType] = useState<ErrorTypes>(ErrorTypes.NoError);
  const dispatch = useDispatch();

  const checkPassword = (inputPassword: string) => regExpPassword.test(inputPassword);
  const checkEmail = (inputEmail: string) => regExpEmail.test(inputEmail);

  const formSubmitHandler = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setErrorType(ErrorTypes.NoError);

    if (!checkEmail(email)) {
      setErrorType(ErrorTypes.EmailError);
      return;
    }

    if (!checkPassword(password)) {
      setErrorType(ErrorTypes.PasswordError);
      return;
    }

    dispatch(logIn({ email, password }));
  };

  const inputEmailHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = evt.target.value;
    setEmail(inputEmail);
  };

  const inputPasswordHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = evt.target.value;
    setPassword(inputPassword);
  };

  const renderError = () => {
    if (errorType === ErrorTypes.EmailError) {
      return EMAIL_ERROR;
    }
    if (errorType === ErrorTypes.PasswordError) {
      return PASSWORD_ERROR;
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoutes.MainPage()} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={formSubmitHandler}>

          {
            renderError()
          }

          <div className="sign-in__fields">
            <div className={`sign-in__field ${errorType === ErrorTypes.EmailError ? 'sign-in__field--error' : ''}`}>
              <input className="sign-in__input" required type="email" placeholder="Email address" value={email} name="email" id="user-email" onChange={inputEmailHandler} />
              <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
            </div>
            <div className={`sign-in__field ${errorType === ErrorTypes.PasswordError ? 'sign-in__field--error' : ''}`}>
              <input className="sign-in__input" required type="password" placeholder="Password" value={password} name="password" id="user-password" onChange={inputPasswordHandler} />
              <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoutes.MainPage()} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2021 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
