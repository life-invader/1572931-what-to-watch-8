import {loadMovies} from './action';

export const fetchMovies = () => async (dispatch: any, _getState: any, api: any): Promise<any> => {
  const {data} = await api.get('https://8.react.pages.academy/wtw/films');
  dispatch(loadMovies(data));
};
