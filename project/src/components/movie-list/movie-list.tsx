import MovieCard from '../movie-card/movie-card';
import type {MovieListType} from './type';

function MovieList({movies}: MovieListType): JSX.Element {
  return (
    <div className="catalog__films-list">
      { movies.map((movie) => <MovieCard key={Math.random()} movie={movie} />) }
    </div>
  );
}

export default MovieList;
