import Watchlist from './pages/Watchlist';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { MovieProvider } from './contexts/MovieContext';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState('');

  async function handleSearch(query) {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchError('');
      return;
    }

    try {
      setSearchError('');
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch {
      setSearchError('Could not search movies. Please try again.');
    }
  }

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchResults={searchResults}
                  searchError={searchError}
                />
              }
            />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
