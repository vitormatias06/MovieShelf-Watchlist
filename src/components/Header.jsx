import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleChange}
          />

          <button
            type="button"
            className="search-button"
            onClick={() => onSearch(query)}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
