import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/playlist`)
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleEdit = (playlistId) => {
        navigate(`/playlist/edit/${playlistId}`);
    };

    const handleDelete = async (playlistId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/playlist/${playlistId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la playlist');
            }
            setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
<div>
            <h1>Liste des Playlists</h1><a href="/playlist/add" className="header-link">Ajouter une playlist</a>
            <ul className="list">
                {playlists.map(playlist => (
                    <li key={playlist._id} className="list-item">
                        <div className="item-info">
                            <h2>{playlist.title}</h2>
                            <p>Description: {playlist.description}</p>
                            <img src={playlist.imageUrl} alt={playlist.title} className="playlist-image" />
                        </div>
                        <div className="btn-group">
                            <button onClick={() => handleEdit(playlist._id)} className="btn btn-edit">Modifier</button>
                            <button onClick={() => handleDelete(playlist._id)} className="btn btn-delete">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPlaylist;
