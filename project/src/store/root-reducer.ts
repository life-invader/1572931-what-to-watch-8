import { combineReducers } from 'redux';
import { movieData } from './movie-data/movie-data';
import { userProcess } from './user-process/user-process';

export enum NameSpace {
  Data = 'Data',
  User = 'User',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: movieData,
  [NameSpace.User]: userProcess,
});
