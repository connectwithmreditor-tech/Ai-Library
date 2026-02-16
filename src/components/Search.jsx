
import React from 'react';

const Search = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-section">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search AI tools..."
                    className="search-input"
                    id="searchInput"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <div className="search-icon">🔍</div>
            </div>
        </div>
    );
};

export default Search;
