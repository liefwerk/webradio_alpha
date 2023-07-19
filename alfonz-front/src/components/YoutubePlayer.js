import { useEffect, useState } from 'react'
import YouTube from "react-youtube";

// hooks and context
import { usePlaylistContext } from '../hooks/usePlaylistContext';
import { getVideosTitle } from '../utils/ytUtils';

// components
import PlayerControls from './PlayerControls'

let videoElement = null

function Player() {
	const { currentPlaylist, dispatch } = usePlaylistContext()
	const [isPaused, setIsPaused] = useState(true)
	const [playlistTracks, setPlaylistsTracks] = useState(null)
	const [videoData, setVideoData] = useState(null)

	const opts = {
		height: "0",
		width: "0",
		playerVars: {
			listType: 'playlist',
			list: currentPlaylist
		}
	}

	useEffect(() => {
		if (videoElement) {
			console.log(videoElement.target.getCurrentTime())

			if (isPaused) {
				videoElement.target.pauseVideo();
			} else {
				videoElement.target.playVideo();
			}
		}
	}, [isPaused])

	useEffect(() => {
		if (videoElement) {
			setPlaylistsTracks(videoElement.target.getPlaylist())
			getVideosTitle(currentPlaylist, function(err, titles) {
				setPlaylistsTracks(titles)
				dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: titles })
			})
		}
	}, [currentPlaylist, dispatch])

	const _onReady = (event) => {
		setIsPaused(true)
		videoElement = event;
	};

	const _onPlay = (event) => {
		if (videoElement) {
			setVideoData(videoElement.target.getVideoData())
		}
	}

	const togglePause = () => {
		setIsPaused(!isPaused)
	}

	const setToNextVideo = () => {
		if (videoElement) {
			videoElement.target.nextVideo()
			setIsPaused(false)
		}
	}

	const setToPreviousVideo = () => {
		if (videoElement) {
			videoElement.target.previousVideo()
			setIsPaused(false)
		}
	}

    return (
		<>
			<div id="video-player--yt" className="video-player video-player--yt">
				<YouTube
					opts={ opts }
					onReady={ _onReady }
					onPlay={ _onPlay } />
			</div>
			<div className="video-title">
				{ videoData && <span className="title">{ videoData.title }</span> }
			</div>
			<PlayerControls
				togglePause={ togglePause }
				setToNextVideo={ setToNextVideo }
				setToPreviousVideo={ setToPreviousVideo }
				isPaused={ isPaused } />
		</>
	)
}

export default Player;