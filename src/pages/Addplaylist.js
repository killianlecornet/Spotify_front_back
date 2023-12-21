import React, { useState, useEffect } from 'react';

const AddPlaylist = () => {
    const [title, setTitle] = useState('');
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/music')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPlaylist = { title, musics: selectedMusics };

        try {
            const response = await fetch('http://localhost:3000/playlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlaylist)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la playlist');
            }

            alert('Playlist créée avec succès!');
            setTitle('');
            setSelectedMusics([]);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleMusicSelection = (musicId) => {
        const alreadySelected = selectedMusics.includes(musicId);
        if (alreadySelected) {
            setSelectedMusics(selectedMusics.filter(id => id !== musicId));
        } else {
            setSelectedMusics([...selectedMusics, musicId]);
        }
    };

    return (
        <div>
            <h1>Ajouter une Nouvelle Playlist</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de la playlist:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Musiques:</label>
                    {musics.map(music => (
                        <div key={music._id}>
                            <input
                                type="checkbox"
                                id={`music-${music._id}`}
                                value={music._id}
                                onChange={() => handleMusicSelection(music._id)}
                                checked={selectedMusics.includes(music._id)}
                            />
                            <label htmlFor={`music-${music._id}`}>{music.title}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Créer la Playlist</button>
            </form>
        </div>
    );
};

export default AddPlaylist;
