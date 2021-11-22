import { combineReducers } from 'redux';
import { movieDataReducer } from './movie-data/movie-data-reducer';
import { userProcessReducer } from './user-process/user-process-reducer';

export enum NameSpace {
  Data = 'Data',
  User = 'User',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: movieDataReducer,
  [NameSpace.User]: userProcessReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
