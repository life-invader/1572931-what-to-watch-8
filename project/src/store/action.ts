import { ActionType } from '../const';
import { setGenreAction, setDefaultGenreAction } from './type';

export const setGenre = (evt: any): setGenreAction => {
  evt.preventDefault();
  return { type: ActionType.ChangeGenre, payload: evt.target.dataset.genre };
};

export const setDefaultGenre = (evt: any): setDefaultGenreAction => {
  evt.preventDefault();
  return { type: ActionType.DefaultGenre, payload: evt.target.dataset.genre };
};
