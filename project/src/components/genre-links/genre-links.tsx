/* eslint-disable no-console */
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setGenre,
  setDefaultGenre
} from '../../store/action';
import type { MoviesType } from '../../types/movies';
import type { RootState } from './type';
import { Genres } from '../../mocks/films';

function GenreLinks(): JSX.Element {
  const dispatch = useDispatch();
  const currentGenre = useSelector((state: RootState) => state.genre);
  const defaultMovies = useSelector((state: RootState) => state.defaultMovies);
  const genres = [...new Set(defaultMovies.map((movie: MoviesType) => movie.genre))]; // Уникальные жанры без повторений
  console.log(genres);

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${currentGenre === Genres.AllGenres ? 'catalog__genres-item--active' : ''}`}>
        <a href="#" className="catalog__genres-link" data-genre={Genres.AllGenres} onClick={(evt) => dispatch(setDefaultGenre(evt))}>All genres</a>
      </li>
      {
        genres.map((genre, index) => (
          <li key={`${index + 1} ${genre}`} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
            <a href="#" className='catalog__genres-link' data-genre={genre} onClick={(evt) => dispatch(setGenre(evt))}>{genre}</a>
          </li>
        ))
      }
    </ul>
  );
}

export default GenreLinks;
