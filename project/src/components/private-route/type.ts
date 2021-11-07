import { PrivateRouteActionType } from '../../const';

export type PrivateRouteType = {
  children: JSX.Element,
  exact: boolean,
  path: string,
  actionType: PrivateRouteActionType,
}
