import React, { useState } from 'react';

const AddAlbum = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAlbum = { title, artist, releaseDate, description };

        try {
            const response = await fetch('http://localhost:3000/album', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlbum)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'album');
            }

            alert('Album ajouté avec succès!');
            setTitle('');
            setArtist('');
            setReleaseDate('');
            setDescription('');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter un Nouvel Album</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de l'album:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="artist">Artiste:</label>
                    <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="releaseDate">Date de sortie:</label>
                    <input type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit">Ajouter l'Album</button>
            </form>
        </div>
    );
};

export default AddAlbum;
