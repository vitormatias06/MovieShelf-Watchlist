
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const { watchlist } = useMovies();

  return (
    <main className="page-container">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>You haven't added any movies to your watchlist yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Watchlist;
