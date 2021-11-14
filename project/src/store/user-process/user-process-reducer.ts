import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout, setNewCommentStatus, setUserInfo } from '../action';
import { AuthStatus, NewCommentStatus } from '../../const';
import type { UserProcess } from './type';
import type { UserInfo } from '../type';

export const defaultState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
  newCommentStatus: NewCommentStatus.Idle,
  userInfo: {} as UserInfo,
};

export const userProcessReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthStatus.NoAuth;
      state.userInfo = {} as UserInfo;
    })
    .addCase(setNewCommentStatus, (state, action) => {
      state.newCommentStatus = action.payload.status;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload.userInfo;
    });
});
