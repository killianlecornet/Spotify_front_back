import React, { useState } from 'react';

const Addmusic = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMusic = { title, artist, genre };

        try {
            const response = await fetch('http://localhost:3000/music', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMusic)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la musique');
            }

            alert('Musique ajoutée avec succès!');
            setTitle('');
            setArtist('');
            setGenre('');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter une Nouvelle Musique</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="artist">Artiste:</label>
                    <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <button type="submit">Ajouter la Musique</button>
            </form>
        </div>
    );
};

export default Addmusic;
