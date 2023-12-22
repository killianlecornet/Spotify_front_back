import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListMusic = () => {
    const [musics, setMusics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URI_API}/music`);
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
            const response = await fetch(`${process.env.REACT_APP_URI_API}/music/${musicId}`, { method: 'DELETE' });
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
            <ul className="list">
                {musics.map(music => (
                    <li key={music._id} className="list-item">
                        <div className="item-info">
                            <h2>{music.title}</h2>
                            <p>Artiste: {music.artist ? music.artist.name : 'Inconnu'}</p>
                            <p>Genre: {music.genre}</p>
                        </div>
                        <div className="btn-group">
                            <button onClick={() => handleEdit(music._id)} className="btn btn-edit">Modifier</button>
                            <button onClick={() => handleDelete(music._id)} className="btn btn-delete">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListMusic;
