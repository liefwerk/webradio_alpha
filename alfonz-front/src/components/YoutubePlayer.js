import { useEffect } from 'react'
import { usePlaylistContext } from '../hooks/usePlaylistContext';

function Player() {

	const { currentPlaylist } = usePlaylistContext()
	let player;
	
	const loadVideo = () => {
		player = new window.YT.Player("youtube-player", {
			height: '390',
			width: '640',
			playerVars: {
				listType: 'playlist',
				list: currentPlaylist,
				controls: 0,
				modestbranding: 1,
				rel: 0,
				showinfo: 0
			},
			events: {
				onStateChange: onPlayerStateChange
			}
		})
	}

	useEffect(() => {
		if(!window.YT) {
			const tag = document.createElement('script')
			tag.src = 'https://www.youtube.com/iframe_api'
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
			window.onYouTubeIframeAPIReady = loadVideo
		} else {
			loadVideo()
		}

		if (currentPlaylist && player) {
			console.log(currentPlaylist && player)
		}
		
		return () => {};
	}, [currentPlaylist]);


	const onPlayerStateChange = (e) => {
		console.log(e)
	}

	const onReady = (event) => {
		event.target.playVideo();
	}

	const pauseVideo = () => { console.log() }

    return (
		<>
			<div id="video-player--yt" className="video-player video-player--yt">
				{/* <YouTube opts={opts} onReady={onReady} /> */}
				<div id="youtube-player"></div>
			</div>
			<p>{currentPlaylist}</p>
			<div id="player-controls player-controls--yt">
				<button onClick={ null }>Play</button>
				<button onClick={ pauseVideo }>Pause</button>
			</div>
		</>
    );
    
}

export default Player;
