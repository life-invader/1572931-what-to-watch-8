import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { AppRoutes } from '../../const';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middleware = [redirect];

const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });
  it('should redirect to "/login"', () => {
    store.dispatch(redirectToRoute(AppRoutes.SignIn()));
    expect(fakeHistory.location.pathname)
      .toBe(AppRoutes.SignIn());

    expect(store.getActions())
      .toEqual([redirectToRoute(AppRoutes.SignIn())]);
  });
});
