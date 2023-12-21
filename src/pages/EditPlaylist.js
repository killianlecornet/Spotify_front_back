import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlaylist = () => {
    const [playlist, setPlaylist] = useState({ title: '', musics: [], description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/playlist/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de la playlist');
                }
                return response.json();
            })
            .then(data => setPlaylist(data))
            .catch(error => {
                console.error('Erreur:', error);
                navigate('/playlist'); // Redirection en cas d'erreur
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        setPlaylist({ ...playlist, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/playlist/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playlist)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la playlist');
            }

            navigate('/playlist'); // Redirection immédiate après une modification réussie
        } catch (error) {
            console.error('Erreur:', error);
            // Gestion optionnelle des erreurs ici
        }
    };

    return (
        <div>
            <h1>Éditer Playlist</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de la Playlist:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={playlist.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={playlist.description} 
                        onChange={handleChange}
                    ></textarea>
                </div>
                {/* Ajoutez ici d'autres champs pour la playlist si nécessaire */}
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default EditPlaylist;
