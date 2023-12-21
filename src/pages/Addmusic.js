import React, { useState, useEffect } from 'react';

const AddMusic = () => {
    const [title, setTitle] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Charger la liste des artistes
        fetch(`${process.env.REACT_APP_URI_API}/artist`)
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', selectedArtist);
        formData.append('genre', genre);
        if (file) formData.append('file', file);
        if (image) formData.append('image', image);

        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/music/upload`, {
                method: 'POST',
                body: formData // Pas de header 'Content-Type' pour le multipart/form-data
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la musique');
            }

            alert('Musique ajoutée avec succès!');
            // Réinitialiser le formulaire ici si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h1>Ajouter une Nouvelle Musique</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Titre de la musique:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artiste:</label>
                    <select id="artist" value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)} required>
                        <option value="">Sélectionnez un artiste</option>
                        {artists.map(artist => (
                            <option key={artist._id} value={artist._id}>{artist.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Fichier audio:</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn-submit">Ajouter la Musique</button>
            </form>
        </div>
    );
};

export default AddMusic;
