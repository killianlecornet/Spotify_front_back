import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        fetch(`http://localhost:3000/album/${id}`)
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
        fetch('http://localhost:3000/artist')
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur:', error));

        fetch('http://localhost:3000/music')
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
            const response = await fetch(`http://localhost:3000/album/${id}`, {
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
        <div>
            <h1>Modifier l'Album</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                <select value={artist} onChange={e => setArtist(e.target.value)} required>
                    <option value="">Sélectionnez un artiste</option>
                    {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                </select>
                <select multiple value={selectedMusics} onChange={e => setSelectedMusics(Array.from(e.target.selectedOptions, option => option.value))}>
                    {musics.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                </select>
                <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Mettre à jour l'Album</button>
            </form>
        </div>
    );
};

export default EditAlbum;
