import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Player from './components/Player'
import YoutubePlaylists from './components/YoutubePlaylists'
import AddPlaylist from './components/AddPlaylist'
import Navigation from './components/Navigation'
import Login from './components/Login'

function App() {

    return (
        <div className="App">
            <Player />
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
