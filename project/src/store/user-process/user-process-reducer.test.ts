import { userProcess, defaultState } from './user-process-reducer';
import { requireAuthorization, requireLogout, setNewCommentStatus, setUserInfo } from '../action';
import { AuthStatus, NewComemntStatus } from '../../const';
import { createMockUserinfo } from '../../mocks/user-data';

const mockCommetnStatus = NewComemntStatus.Idle;
const mockuserInfo = createMockUserinfo();

describe('Test for user actions reducer', () => {
  it('Should return current authorization status', () => {
    expect(userProcess(defaultState, requireAuthorization(AuthStatus.Auth)))
      .toEqual({
        ...defaultState,
        authorizationStatus: AuthStatus.Auth,
      });
  });

  it('Should return "NoAuth" authorization status and clear userinfo', () => {
    expect(userProcess(defaultState, requireLogout()))
      .toEqual({
        ...defaultState,
        authorizationStatus: AuthStatus.NoAuth,
        userInfo: {},
      });
  });

  it('Should return comment status: idle or loading', () => {
    expect(userProcess(defaultState, setNewCommentStatus(mockCommetnStatus)))
      .toEqual({
        ...defaultState,
        newCommentStatus: mockCommetnStatus,
      });
  });

  it('Should set userinfo', () => {
    expect(userProcess(defaultState, setUserInfo(mockuserInfo)))
      .toEqual({
        ...defaultState,
        userInfo: mockuserInfo,
      });
  });

});
