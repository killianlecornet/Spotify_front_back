import React, { useState, useEffect } from 'react';
import './css/edit&add/style.css';

const AddPlaylist = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Charger la liste des musiques
        fetch(`${process.env.REACT_APP_URI_API}/music`)
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('musics', selectedMusics.join(','));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/playlist/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la playlist');
            }

            alert('Playlist ajoutée avec succès!');
            // Réinitialiser les champs du formulaire ici si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h1>Ajouter une Nouvelle Playlist</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Titre de la playlist:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="musics">Musiques:</label>
                    <select id="musics" multiple value={selectedMusics} onChange={(e) => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                        {musics.map(music => <option key={music._id} value={music._id}>{music.title}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn-submit">Ajouter la Playlist</button>
            </form>
        </div>
    );
};

export default AddPlaylist;
