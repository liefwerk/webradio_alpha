import YouTube from 'react-youtube';
import { usePlaylistContext } from '../hooks/usePlaylistContext';

function Player() {

	const { playlist } = usePlaylistContext()

	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			listType: 'playlist',
			list: playlist,
			controls: 0,
			modestbranding: 1,
			rel: 0,
			showinfo: 0
		},
	};

	const onReady = (event) => {
		event.target.playVideo();
	}

    return (
        <div id="player" className="player">
            <YouTube opts={opts} onReady={onReady} />
        </div>
    );
    
}

export default Player;
