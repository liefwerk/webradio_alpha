import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import YoutubePlayer from './components/YoutubePlayer'
import YoutubePlaylists from './components/YoutubePlaylists'
import AddPlaylist from './components/AddPlaylist'
import Navigation from './components/Navigation'
import Login from './components/Login'

function App() {

    return (
        <div className="App">
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
