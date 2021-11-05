import React from 'react';
import MovieCard from '../movie-card/movie-card';
import type { MovieListType } from './type';

function MovieList({ movies, moviesCount }: MovieListType): JSX.Element {
  return (
    <div className="catalog__films-list">
      {movies.length ? movies.slice(0, moviesCount).map((movie) => <MovieCard key={movie.id} movie={movie} />) : ''}
    </div>
  );
}

export default MovieList;
