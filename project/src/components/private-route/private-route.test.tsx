import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthStatus, PrivateRouteActionType } from '../../const';
import { State } from '../../store/type';
import PrivateRoute from './private-route';
import { Router as BrowserRouter, Route } from 'react-router-dom';

const mockStore = configureMockStore<State>();
const history = createMemoryHistory();

const privateRoute = '/private';

const storeAuth = mockStore({
  User: {
    authorizationStatus: AuthStatus.Auth,
  },
});

const storeNotAuth = mockStore({
  User: {
    authorizationStatus: AuthStatus.NoAuth,
  },
});

describe('Component: private-route', () => {
  beforeEach(() => {
    history.push(privateRoute);
  });

  it('should not render private content if user not authorized', () => {
    render(
      <Provider store={storeNotAuth}>
        <BrowserRouter history={history}>
          <Route exact path={'/login'}>
            <div>Genetal content</div>
          </Route>
          <PrivateRoute exact path={privateRoute} actionType={PrivateRouteActionType.User} >
            <div>Private content</div>
          </PrivateRoute>
        </BrowserRouter>
      </Provider >);

    expect(screen.getByText('Genetal content')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });

  it('should render private content if user authorized', () => {
    render(
      <Provider store={storeAuth}>
        <BrowserRouter history={history}>
          <Route exact path={'/login'}>
            <div>Genetal content</div>
          </Route>
          <PrivateRoute exact path={privateRoute} actionType={PrivateRouteActionType.User} >
            <div>Private content</div>
          </PrivateRoute>
        </BrowserRouter>
      </Provider >);

    expect(screen.queryByText('Genetal content')).not.toBeInTheDocument();
    expect(screen.getByText('Private content')).toBeInTheDocument();
  });
});
