
import { useEffect, useState } from 'react';
import { useMovies } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useMovies();

  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    setIsFavorite(
      favorites.some((favorite) => favorite.id === movie.id)
    );
  }, [movie.id]);

  function toggleFavorite() {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    let updatedFavorites;

    if (alreadyFavorite) {
      updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== movie.id
      );
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!alreadyFavorite);
  }

  function toggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />

        <button
          type="button"
          className="favorite-button"
          onClick={toggleFavorite}
          aria-label={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">
            ★ {movie.vote_average?.toFixed(1) ?? 'N/A'}
          </span>

          <span className="movie-year">
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : 'N/A'}
          </span>
        </div>

        <button
          type="button"
          className="watchlist-button"
          onClick={toggleWatchlist}
        >
          {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
