// import React, { useState, useEffect } from 'react';

// const Stats = () => {
//     const [musicCount, setMusicCount] = useState(0);
//     const [albumCount, setAlbumCount] = useState(0);

//     useEffect(() => {
//         fetch('http://localhost:3000/music/count')
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Musics:', data); // Pour déboguer
//                 setMusicCount(data.count);
//             })
//             .catch(error => console.error('Erreur lors de la récupération du nombre de morceaux:', error));

//         fetch('http://localhost:3000/album/count')
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Albums:', data); // Pour déboguer
//                 setAlbumCount(data.count);
//             })
//             .catch(error => console.error('Erreur lors de la récupération du nombre d\'albums:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Statistiques</h1>
//             <p>Nombre de Morceaux: {musicCount}</p>
//             <p>Nombre d'Albums: {albumCount}</p>
//         </div>
//     );
// };

// export default Stats;
