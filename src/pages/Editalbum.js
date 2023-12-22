import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/edit&add/style.css';

const EditAlbum = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [artists, setArtists] = useState([]);
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const { id } = useParams(); // Récupère l'ID de l'album depuis les paramètres de route

    useEffect(() => {
        // Charger les détails de l'album
        fetch(`${process.env.REACT_APP_URI_API}/album/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setArtist(data.artist._id);
                setSelectedMusics(data.music.map(m => m._id));
                setReleaseDate(data.releaseDate.slice(0, 10)); // Ajuster le format de la date si nécessaire
                setDescription(data.description);
            })
            .catch(error => console.error('Erreur:', error));

        // Charger la liste des artistes et des musiques
        fetch(`${process.env.REACT_APP_URI_API}/artist`)
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur:', error));

        fetch(`${process.env.REACT_APP_URI_API}/music`)
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('releaseDate', releaseDate);
        formData.append('description', description);
        formData.append('musics', selectedMusics.join(','));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/album/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'album');
            }

            alert('Album mis à jour avec succès!');
            // Réinitialiser les champs du formulaire ici si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h1>Modifier l'Album</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Titre de l'album:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artiste:</label>
                    <select id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} required>
                        <option value="">Sélectionnez un artiste</option>
                        {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="musics">Musiques:</label>
                    <select id="musics" multiple value={selectedMusics} onChange={(e) => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                        {musics.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="releaseDate">Date de sortie:</label>
                    <input type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image de l'album:</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn-submit">Mettre à jour l'Album</button>
            </form>
        </div>
    );
};

export default EditAlbum;
