import React, { useState, useEffect } from 'react';
import './css/edit&add/style.css';

const AddArtist = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [albums, setAlbums] = useState([]);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Charger la liste des albums et des musiques
        fetch(`${process.env.REACT_APP_URI_API}/album`)
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Erreur:', error));

        fetch(`${process.env.REACT_APP_URI_API}/music`)
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('albums', selectedAlbums.join(','));
        formData.append('musics', selectedMusics.join(','));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/artist/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'artiste');
            }

            alert('Artiste ajouté avec succès!');
            // Réinitialiser les champs du formulaire ici si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h1>Ajouter un Nouvel Artiste</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Nom de l'artiste:</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="albums">Albums:</label>
                    <select id="albums" multiple value={selectedAlbums} onChange={e => setSelectedAlbums(Array.from(e.target.selectedOptions, option => option.value))}>
                        {albums.map(album => <option key={album._id} value={album._id}>{album.title}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="musics">Musiques:</label>
                    <select id="musics" multiple value={selectedMusics} onChange={e => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                        {musics.map(music => <option key={music._id} value={music._id}>{music.title}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={e => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn-submit">Ajouter l'Artiste</button>
            </form>
        </div>
    );
};

export default AddArtist;
