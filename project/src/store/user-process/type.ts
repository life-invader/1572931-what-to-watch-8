import { AuthStatus, NewCommentStatus } from '../../const';
import { UserInfo } from '../type';

export type UserProcess = {
  authorizationStatus: AuthStatus,
  newCommentStatus: NewCommentStatus,
  userInfo: UserInfo,
}
