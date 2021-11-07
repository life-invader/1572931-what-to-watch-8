import { AuthStatus, NewComemntStatus } from '../../const';
import { UserInfo } from '../type';

export type UserProcess = {
  authorizationStatus: AuthStatus,
  newCommentStatus: NewComemntStatus,
  userInfo: UserInfo,
}
