import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Editartist = () => {
    const [artist, setArtist] = useState({ name: '', imageUrl: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/artist/${id}`)
            .then(response => response.json())
            .then(data => setArtist(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    const handleChange = (e) => {
        setArtist({ ...artist, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/artist/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(artist)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'artiste');
            }

            navigate('/artist'); // Redirigez vers la liste des artistes après la mise à jour
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Éditer l'Artiste</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom de l'artiste:</label>
                    <input type="text" id="name" name="name" value={artist.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="imageUrl">URL de l'image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={artist.imageUrl} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={artist.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Mettre à jour l'Artiste</button>
            </form>
        </div>
    );
};

export default Editartist;
