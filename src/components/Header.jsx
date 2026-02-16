
import React from 'react';



const Header = () => {
  return (
    <header className="library-header">
      <div className="header-content">
        <h1>AI Tools Library</h1>
        <p>Discover and explore the best AI tools across different categories</p>
      </div>
      <div className="header-buttons">
        <a href="#/admin" className="admin-btn">
          <span style={{ color: '#FFD700', fontSize: '1.2em', marginRight: '5px' }}>🛡️</span> Admin
        </a>
      </div>
    </header>
  );
};

export default Header;
