import React, { useState } from 'react';

const Addartist = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newArtist = { name, imageUrl, description };

        try {
            const response = await fetch('http://localhost:3000/artist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newArtist)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'artiste');
            }

            alert('Artiste ajouté avec succès!');
            setName('');
            setImageUrl('');
            setDescription('');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter un Nouvel Artiste</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom de l'artiste:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="imageUrl">URL de l'image:</label>
                    <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit">Ajouter l'Artiste</button>
            </form>
        </div>
    );
};

export default Addartist;
