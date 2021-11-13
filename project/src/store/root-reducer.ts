import { combineReducers } from 'redux';
import { movieData } from './movie-data/movie-data-reducer';
import { userProcess } from './user-process/user-process-reducer';

export enum NameSpace {
  Data = 'Data',
  User = 'User',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: movieData,
  [NameSpace.User]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
