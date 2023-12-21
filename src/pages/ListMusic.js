import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListMusic = () => {
    const [musics, setMusics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await fetch('http://localhost:3000/music');
                const data = await response.json();
                setMusics(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des musiques:', error);
            }
        };

        fetchMusics();
    }, []);

    const handleEdit = (musicId) => {
        navigate(`/music/edit/${musicId}`);
    };

    const handleDelete = async (musicId) => {
        try {
            const response = await fetch(`http://localhost:3000/music/${musicId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la musique');
            }
            setMusics(musics.filter(music => music._id !== musicId));
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Liste des Musiques</h1>
            <ul>
                {musics.map(music => (
                    <li key={music._id}>
                        <h2>{music.title}</h2>
                        <p>Artiste: {music.artist ? music.artist.name : 'Inconnu'}</p>
                        <p>Genre: {music.genre}</p>
                        <button onClick={() => handleEdit(music._id)}>Modifier</button>
                        <button onClick={() => handleDelete(music._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListMusic;
