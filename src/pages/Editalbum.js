import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAlbum = () => {
    const [album, setAlbum] = useState({
        title: '',
        artist: '',
        releaseDate: '',
        description: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/album/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de l\'album');
                }
                return response.json();
            })
            .then(data => setAlbum(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    const handleChange = (e) => {
        setAlbum({ ...album, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/album/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(album)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'album');
            }

            navigate('/album'); // Redirigez vers la liste des albums après la mise à jour
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Éditer l'Album</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de l'album:</label>
                    <input type="text" id="title" name="title" value={album.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="artist">Artiste:</label>
                    <input type="text" id="artist" name="artist" value={album.artist} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="releaseDate">Date de sortie:</label>
                    <input type="date" id="releaseDate" name="releaseDate" value={album.releaseDate} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={album.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Mettre à jour l'Album</button>
            </form>
        </div>
    );
};

export default EditAlbum;
