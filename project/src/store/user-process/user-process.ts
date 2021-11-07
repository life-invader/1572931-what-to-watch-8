import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout, setNewCommentStatus } from '../action';
import { AuthStatus, NewComemntStatus } from '../../const';
import type { UserProcess } from './type';

const defaultState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
  newCommentStatus: NewComemntStatus.Idle,
};

export const userProcess = createReducer(defaultState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthStatus.NoAuth;
    })
    .addCase(setNewCommentStatus, (state, action) => {
      state.newCommentStatus = action.payload.status;
    });
});
