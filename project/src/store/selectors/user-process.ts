import { NameSpace } from '../root-reducer';
import { AuthStatus } from '../../const';
import type { State } from '../../store/type';

export const getAuthorizationStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
