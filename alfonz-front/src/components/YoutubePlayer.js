import { useEffect, useState } from 'react'
// https://github.com/tjallingt/react-youtube
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

	// https://developers.google.com/youtube/iframe_api_reference
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

		if (!playlistTracks) {
			setPlaylistsTracks(videoElement.target.getPlaylist())
			getVideosTitle(currentPlaylist, function(err, titles) {
				setPlaylistsTracks(titles)
				dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: titles })
			})
			dispatch({ type: 'ADD_CURRENT_TRACK_INDEX', payload: 1 })
		}
	};

	const _onPlay = (event) => {
		if (videoElement) {
			setVideoData(videoElement.target.getVideoData())
		}
	}

	const _onStateChange = (event) => {
		// -1 (unstarted)
		// 0 (ended)
		// 1 (playing)
		// 2 (paused)
		// 3 (buffering)
		// 5 (video cued)
		if (videoElement && event.data === 1) {
			setVideoData(videoElement.target.getVideoData())
			
			const index = videoElement.target.getPlaylistIndex()
			dispatch({ type: 'ADD_CURRENT_TRACK_INDEX', payload: index + 1 })
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
					onPlay={ _onPlay }
					onStateChange={ _onStateChange } />
			</div>
			<div className="video-title">
				{ videoData && (
					<>
						<h3 className="video-title__sub">PLAYING</h3>
						<span className="title">{ videoData.title }</span>
					</>
				)}
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