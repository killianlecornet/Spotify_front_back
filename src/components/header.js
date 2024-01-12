import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Adjust the path to your CSS file as needed

const Header = () => {
    return (
        <div className="header">
            <Link to="/album" className="header-link"><p>Album</p></Link>
            <Link to="/playlist" className="header-link"><p>Playlist</p></Link>
            <Link to="/artist" className="header-link"><p>Artiste</p></Link>
            <Link to="/music" className="header-link"><p>Music</p></Link>
        </div>
    );
};

export default Header;
