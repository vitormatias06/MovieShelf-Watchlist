import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError('');

        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch {
        setError('Could not load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const isSearching = searchResults !== null;
  const displayedMovies = searchResults ?? movies;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {!isSearching && loading && <LoadingSpinner />}

      {!isSearching && <ErrorMessage message={error} />}

      {searchError && <ErrorMessage message={searchError} />}

      {isSearching && !searchError && displayedMovies.length === 0 && (
        <p>No movies found. Try another search.</p>
      )}

      {!loading && !error && !searchError && (
        <MovieGrid movies={displayedMovies} />
      )}

      {isSearching && !searchError && (
        <MovieGrid movies={displayedMovies} />
      )}
    </main>
  );
}

export default Home;
