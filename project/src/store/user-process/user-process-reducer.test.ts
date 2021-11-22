import { userProcessReducer, defaultState } from './user-process-reducer';
import { requireAuthorization, requireLogout, setNewCommentStatus, setUserInfo } from '../action';
import { AuthStatus, NewCommentStatus } from '../../const';
import { createMockUserinfo } from '../../mocks/user-data';

const mockCommetnStatus = NewCommentStatus.Idle;
const mockuserInfo = createMockUserinfo();

describe('Test for user actions reducer', () => {
  it('Should return current authorization status', () => {
    expect(userProcessReducer(defaultState, requireAuthorization(AuthStatus.Auth)))
      .toEqual({
        ...defaultState,
        authorizationStatus: AuthStatus.Auth,
      });
  });

  it('Should return "NoAuth" authorization status and clear userinfo', () => {
    expect(userProcessReducer(defaultState, requireLogout()))
      .toEqual({
        ...defaultState,
        authorizationStatus: AuthStatus.NoAuth,
        userInfo: {},
      });
  });

  it('Should return comment status: idle or loading', () => {
    expect(userProcessReducer(defaultState, setNewCommentStatus(mockCommetnStatus)))
      .toEqual({
        ...defaultState,
        newCommentStatus: mockCommetnStatus,
      });
  });

  it('Should set userinfo', () => {
    expect(userProcessReducer(defaultState, setUserInfo(mockuserInfo)))
      .toEqual({
        ...defaultState,
        userInfo: mockuserInfo,
      });
  });

});
