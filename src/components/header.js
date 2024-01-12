import React from 'react';
import './header.css'; // Adjust the import path as needed

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/album" className="header-link">Album</a>
        <a href="/playlist" className="header-link">Playlist</a>
        <a href="/artist" className="header-link">Artist</a>
        <a href="/" className="header-link">Musique</a>
      </div>
    </header>
  );
};

export default Header;
