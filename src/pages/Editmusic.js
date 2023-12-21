import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Editmusic = () => {
    const [music, setMusic] = useState({ title: '', artist: '', genre: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/music/${id}`)
            .then(response => response.json())
            .then(data => setMusic(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    const handleChange = (e) => {
        setMusic({ ...music, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/music/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(music)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la musique');
            }

            navigate('/music'); // Redirigez vers la liste des musiques après la mise à jour
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Éditer la Musique</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre:</label>
                    <input type="text" id="title" name="title" value={music.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="artist">Artiste:</label>
                    <input type="text" id="artist" name="artist" value={music.artist} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" value={music.genre} onChange={handleChange} required />
                </div>
                <button type="submit">Mettre à jour la Musique</button>
            </form>
        </div>
    );
};

export default Editmusic;
