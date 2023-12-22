import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/edit&add/style.css';

const EditMusic = () => {
    const [music, setMusic] = useState({ title: '', artist: '', genre: '' });
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [artists, setArtists] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Charger la musique à éditer
        fetch(`${process.env.REACT_APP_URI_API}/music/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Musique actuelle:', data); // Log pour débogage
                setMusic(data);
            })
            .catch(error => console.error('Erreur lors du chargement de la musique:', error));

        // Charger la liste des artistes
        fetch(`${process.env.REACT_APP_URI_API}/artist`)
            .then(response => response.json())
            .then(data => {
                console.log('Liste des artistes:', data); // Log pour débogage
                setArtists(data);
            })
            .catch(error => console.error('Erreur lors du chargement des artistes:', error));
    }, [id]);

    const handleChange = (e) => {
        setMusic({ ...music, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'file') {
            setFile(e.target.files[0]);
        } else if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', music.title);
        formData.append('artist', music.artist);
        formData.append('genre', music.genre);
        if (file) formData.append('file', file);
        if (image) formData.append('image', image);

        try {
            const response = await fetch(`${process.env.REACT_APP_URI_API}/music/${id}`, {
                method: 'PUT',
                body: formData
            });

            const result = await response.json();
            console.log('Mise à jour réussie:', result); // Log pour débogage

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la musique');
            }

            navigate('/music');
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    return (
        <div className="container">
            <h1>Éditer la Musique</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Titre:</label>
                    <input type="text" id="title" name="title" value={music.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artiste:</label>
                    <select id="artist" name="artist" value={music.artist} onChange={handleChange} required>
                        {artists.map((artist) => (
                            <option key={artist._id} value={artist._id}>{artist.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" value={music.genre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Fichier audio (optionnel):</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image (optionnel):</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn-submit">Mettre à jour la Musique</button>
            </form>
        </div>
    );
};

export default EditMusic;
