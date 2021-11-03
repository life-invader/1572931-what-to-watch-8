import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setGenre,
  setDefaultGenre
} from '../../store/action';
import type { MoviesType } from '../../types/movies';
import type { RootState, GenreLinksType } from './type';
import { Genres } from '../../const';

function GenreLinks({ resetCurrentAmout }: GenreLinksType): JSX.Element {
  const dispatch = useDispatch();
  const currentGenre = useSelector((state: RootState) => state.genre);
  const defaultMovies = useSelector((state: RootState) => state.defaultMovies);
  const genres = [...new Set(defaultMovies.map((movie: MoviesType) => movie.genre))]; // Уникальные жанры без повторений

  const defaultGenreClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const genre = evt.currentTarget.dataset.genre;

    if (currentGenre === evt.currentTarget.dataset.genre) {
      return;
    }

    resetCurrentAmout();

    // Проверка на undefined, иначе ts ругается;
    if (genre) {
      dispatch(setDefaultGenre(genre));
    }
  };

  const genreClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const genre = evt.currentTarget.dataset.genre;

    if (currentGenre === evt.currentTarget.dataset.genre) {
      return;
    }

    resetCurrentAmout();

    // Проверка на undefined, иначе ts ругается;
    if (genre) {
      dispatch(setGenre(genre));
    }
  };

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${currentGenre === Genres.AllGenres ? 'catalog__genres-item--active' : ''}`}>
        <a href="#" className="catalog__genres-link" data-genre={Genres.AllGenres} onClick={defaultGenreClickHandler}>All genres</a>
      </li>
      {
        genres.map((genre, index) => (
          <li key={`${index + 1} ${genre}`} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
            <a href="#" className='catalog__genres-link' data-genre={genre} onClick={genreClickHandler}>{genre}</a>
          </li>
        ))
      }
    </ul>
  );
}

export default GenreLinks;
