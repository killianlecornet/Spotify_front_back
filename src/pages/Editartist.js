import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditArtist = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [albums, setAlbums] = useState([]);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);
    const [image, setImage] = useState(null);
    const { id } = useParams(); // Récupère l'ID de l'artiste depuis les paramètres de route

    useEffect(() => {
        // Charger les détails de l'artiste
        fetch(`http://localhost:3000/artist/${id}`)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setSelectedAlbums(data.albums.map(a => a._id));
                setSelectedMusics(data.music.map(m => m._id));
            })
            .catch(error => console.error('Erreur:', error));

        // Charger la liste des albums et des musiques
        fetch('http://localhost:3000/album')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Erreur:', error));

        fetch('http://localhost:3000/music')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

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
            const response = await fetch(`http://localhost:3000/artist/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'artiste');
            }

            alert('Artiste mis à jour avec succès!');
            // Réinitialiser les champs du formulaire ici si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h1>Modifier l'Artiste</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                <select multiple value={selectedAlbums} onChange={e => setSelectedAlbums(Array.from(e.target.selectedOptions, option => option.value))}>
                    {albums.map(album => <option key={album._id} value={album._id}>{album.title}</option>)}
                </select>
                <select multiple value={selectedMusics} onChange={e => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                    {musics.map(music => <option key={music._id} value={music._id}>{music.title}</option>)}
                </select>
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Mettre à jour l'Artiste</button>
            </form>
        </div>
    );
};

export default EditArtist;
