import React from 'react';
import MovieCard from '../movie-card/movie-card';
import type { MovieListType } from './type';

function MovieList({ movies, moviesCount }: MovieListType): JSX.Element {
  const [, setMovieId] = React.useState(0);

  function handleActiveMovie(id: number): void {
    setMovieId(id);
  }

  return (
    <div className="catalog__films-list">
      {movies.length ? movies.slice(0, moviesCount).map((movie) => <MovieCard key={movie.id} movie={movie} handleActiveMovie={handleActiveMovie} />) : ''}
    </div>
  );
}

export default MovieList;
