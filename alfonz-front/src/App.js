import { BrowserRouter, Routes, Route } from "react-router-dom";

// hooks
import { usePlaylistContext } from './hooks/usePlaylistContext'

// components
import YoutubePlayer from './components/player/YoutubePlayer'
import YoutubePlaylists from './components/playlist/YoutubePlaylists'
import AddPlaylist from './components/playlist/AddPlaylist'
import Navigation from './components/Navigation'
import Login from './components/login/Login'

function App() {
	const { currentPlaylist } = usePlaylistContext()
	const playerVisible = Boolean(currentPlaylist)

	return (
		<div className={ `App ${ playerVisible ? 'App--player-visible' : 'App--player-hidden' }` }>
			<YoutubePlayer />
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<YoutubePlaylists />} />
                    <Route path="/add" element={<AddPlaylist />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
