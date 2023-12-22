import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/list/style.css';

const ListArtist = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/artist`)
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleEdit = (artistId) => {
        navigate(`/artist/edit/${artistId}`);
    };

    const handleDelete = async (artistId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/artist/${artistId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'artiste');
            }
            setArtists(artists.filter(artist => artist._id !== artistId));
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
<div>
            <h1>Liste des Artistes</h1>
            <ul>
                {artists.map(artist => (
                    <li key={artist._id}>
                        <div className="artist-info">
                            <h2>{artist.name}</h2>
                            <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
                            <p>{artist.description}</p>
                        </div>
                        <div className="btn-group">
                            <button onClick={() => handleEdit(artist._id)} className="btn btn-edit">Modifier</button>
                            <button onClick={() => handleDelete(artist._id)} className="btn btn-delete">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListArtist;
