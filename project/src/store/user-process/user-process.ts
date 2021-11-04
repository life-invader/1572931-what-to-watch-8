import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout } from '../action';
import { AuthStatus } from '../../const';
import type { UserProcess } from './type';

const defaultState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
};

export const userProcess = createReducer(defaultState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = AuthStatus.NoAuth;
    });
});
