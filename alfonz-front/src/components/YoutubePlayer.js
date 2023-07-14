import { useState, useEffect } from 'react'
import { usePlaylistContext } from '../hooks/usePlaylistContext';

import { useYoutubePlayer } from "react-hook-youtube";

function Player() {
	const { currentPlaylist } = usePlaylistContext()

	const { YoutubePlayer, player } = useYoutubePlayer({
		height: "390",
		width: "640",
		playerVars: {
			listType: 'playlist',
			list: currentPlaylist
		},
		events: {},
	});

	useEffect(() => {
		console.log(currentPlaylist)

		player.loadPlaylist({
			list: currentPlaylist
		})
		return () => {
			player.playVideo()
		}

	}, [currentPlaylist])

	const pauseVideo = () => {
		player.loadPlaylist({
			list: currentPlaylist
		})
	}

    return (
		<>
			<div id="video-player--yt" className="video-player video-player--yt">
				{/* <YouTube opts={opts} onReady={onReady} /> */}
				<YoutubePlayer />
			</div>
			<p>{ currentPlaylist }</p>
			<div id="player-controls player-controls--yt">
				<button onClick={ null }>Play</button>
				<button onClick={ pauseVideo }>Pause</button>
			</div>
		</>
	)
}

export default Player;