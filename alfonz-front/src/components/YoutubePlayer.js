import { useEffect, useState } from 'react'
import { usePlaylistContext } from '../hooks/usePlaylistContext';

import YouTube from "react-youtube";

let videoElement = null

function Player() {
	const { currentPlaylist } = usePlaylistContext()
	// const [ songTitle, setSongTitle ] = useState()
	const [isPaused, setIsPaused] = useState(true)

	const togglePause = () => {
		setIsPaused(!isPaused)
	}

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			listType: 'playlist',
			list: currentPlaylist
		}
	}

	useEffect(() => {

		if (videoElement) {
			console.log(isPaused)

			if (isPaused) {
				videoElement.target.pauseVideo();
			} else {
				videoElement.target.playVideo();
			}
		}

		return () => {}
	}, [isPaused, videoElement])

	const _onReady = (event) => {
		setIsPaused(true)
		videoElement = event;
	};

    return (
		<>
			<div id="video-player--yt" className="video-player video-player--yt">
				<YouTube
					opts={ opts }
					onReady={_onReady} />
			</div>
			<p>{ currentPlaylist }</p>
			<div id="player-controls player-controls--yt">
				<button onClick={ togglePause }>
					{ !isPaused ? 'pause' : 'play' }
				</button>
			</div>
		</>
	)
}

export default Player;