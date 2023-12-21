import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/playlist')
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleEdit = (playlistId) => {
        navigate(`/playlist/edit/${playlistId}`);
    };

    const handleDelete = async (playlistId) => {
        try {
            const response = await fetch(`http://localhost:3000/playlist/${playlistId}`, { method: 'DELETE' });
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
            <h1>Liste des Playlists</h1>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist._id}>
                        <h2>{playlist.title}</h2>
                        <p>Artiste: {playlist.artist ? playlist.artist.name : 'Inconnu'}</p>
                        <p>Description: {playlist.description}</p>
                        <button onClick={() => handleEdit(playlist._id)}>Éditer</button>
                        <button onClick={() => handleDelete(playlist._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPlaylist;
