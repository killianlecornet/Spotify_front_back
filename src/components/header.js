import React from 'react';
import './Header.css'; // Link to the CSS file

const Header = ({ onMenuSelect }) => {
    return (
        <header className="header">
            <button onClick={() => onMenuSelect('album')} className="header-button">Album</button>
            <button onClick={() => onMenuSelect('playlist')} className="header-button">Playlist</button>
            <button onClick={() => onMenuSelect('artist')} className="header-button">Artist</button>
            <button onClick={() => onMenuSelect('music')} className="header-button">Music</button>
        </header>
    );
};

export default Header;
