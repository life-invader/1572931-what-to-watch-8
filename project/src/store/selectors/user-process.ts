import { NameSpace } from '../root-reducer';
import { AuthStatus, NewComemntStatus } from '../../const';
import type { State } from '../../store/type';
import { createSelector } from 'reselect';

export const getAuthorizationStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getFormLoadingStatus = createSelector((state: State) => state[NameSpace.User].newCommentStatus, (newCommentStatus) => newCommentStatus === NewComemntStatus.Loading);
