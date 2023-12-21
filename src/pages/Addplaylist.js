import React, { useState, useEffect } from 'react';

const AddPlaylist = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Charger la liste des musiques
        fetch('http://localhost:3000/music')
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
            const response = await fetch('http://localhost:3000/playlist/upload', {
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
        <div>
            <h1>Ajouter une Nouvelle Playlist</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de la playlist" required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description de la playlist" required />
                <select multiple value={selectedMusics} onChange={e => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                    {musics.map(music => <option key={music._id} value={music._id}>{music.title}</option>)}
                </select>
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Ajouter la Playlist</button>
            </form>
        </div>
    );
};

export default AddPlaylist;
