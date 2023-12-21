import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListAlbum = () => {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/album`);
            const data = await response.json();
            setAlbums(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (albumId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/album/${albumId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'album');
            }
            fetchAlbums(); // Recharger la liste des albums après la suppression
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleEdit = (albumId) => {
        navigate(`/album/edit/${albumId}`); // Utilisez navigate pour rediriger
    };

    return (
        <div>
            <h1>Liste des Albums</h1>
            <ul>
                {albums.map(album => (
                    <li key={album._id}>
                        <h2>{album.title}</h2>
                        <p>Artiste: {album.artist ? album.artist.name : 'Inconnu'}</p>
                        <p>Date de sortie: {album.releaseDate}</p>
                        <p>Description: {album.description}</p>
                        <button onClick={() => handleEdit(album._id)}>Modifier</button>
                        <button onClick={() => handleDelete(album._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListAlbum;
