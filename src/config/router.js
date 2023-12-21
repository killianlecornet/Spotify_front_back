import { createBrowserRouter } from "react-router-dom";
import AddMusic from '../pages/Addmusic';
import EditMusic from '../pages/Editmusic';
import ListMusic from '../pages/ListMusic';
import ListAlbum from "../pages/ListAlbum";
import Addalbum from "../pages/Addalbum";
import EditAlbum from "../pages/Editalbum";
import AddArtist from '../pages/Addartist';
import ListArtist from '../pages/ListArtist';
import EditArtist from '../pages/Editartist';
import AddPlaylist from '../pages/Addplaylist';
import EditPlaylist from '../pages/EditPlaylist';
import ListPlaylist from '../pages/ListPlaylist';

const router = createBrowserRouter([

    {
        path: '/music',
        element: <ListMusic />
    },
    {
        path: '/music/add',
        element: <AddMusic />
    },
    {
        path: '/music/edit/:id',
        element: <EditMusic />
    },
    {
        path: "/album",
        element: <ListAlbum />
    },
    {
        path: "/album/add",
        element: <Addalbum />
    },
    {
        path: '/album/edit/:id', 
        element: <EditAlbum />
    },
    {
        path: '/artist',
        element: <ListArtist />
    },
    {
        path: '/artist/add',
        element: <AddArtist />
    },
    {
        path: '/artist/edit/:id',
        element: <EditArtist />
    },
    {
        path: '/playlist',
        element: <ListPlaylist />
    },
    {
        path: '/playlist/add',
        element: <AddPlaylist />
    },
    {
        path: '/playlist/edit/:id',
        element: <EditPlaylist />
    }

]);
export default router;