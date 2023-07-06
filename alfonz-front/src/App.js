import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Player from './components/Player'
import YoutubePlaylists from './components/YoutubePlaylists'
import AddPlaylist from './components/AddPlaylist'
import Navigation from './components/Navigation'

function App() {

    return (
        <div className="App">
            <Player />
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<YoutubePlaylists />} />
                    <Route path="/add" element={<AddPlaylist />} />
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
