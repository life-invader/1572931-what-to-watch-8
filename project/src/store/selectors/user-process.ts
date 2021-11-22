import { NameSpace } from '../root-reducer';
import { AuthStatus, NewCommentStatus } from '../../const';
import type { State } from '../../store/type';
import { createSelector } from 'reselect';

export const getAuthorizationStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getAvatar = (state: State): string => state[NameSpace.User].userInfo.avatar_url;
export const getFormLoadingStatus = createSelector((state: State) => state[NameSpace.User].newCommentStatus, (newCommentStatus) => newCommentStatus === NewCommentStatus.Loading);
