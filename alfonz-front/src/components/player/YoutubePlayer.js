import { useEffect, useState, useRef } from 'react'
// https://github.com/tjallingt/react-youtube
import YouTube from "react-youtube";

// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext';
import { getVideosTitle } from '../../utils/ytUtils';

// components
import PlayerControls from './PlayerControls'

let videoElement = null
let timer

function Player() {
	const { currentPlaylist, dispatch } = usePlaylistContext()
	const [isPaused, setIsPaused] = useState(true)
	const [playlistTracks, setPlaylistsTracks] = useState(null)
	const [videoData, setVideoData] = useState(null)
	const [videoDuration, setVideoDuration] = useState(0)
	const timeBar = useRef(null)

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
			getVideosTitle(currentPlaylist, function(err, tracks) {
				setPlaylistsTracks(tracks)
				dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: tracks })
			})
		}
	}, [currentPlaylist, dispatch])

	const _onReady = (event) => {
		videoElement = event;
		dispatch({ type: 'ADD_YT_PLAYER', payload: event })
		
		if (!playlistTracks) {
			setPlaylistsTracks(videoElement.target.getPlaylist())
			getVideosTitle(currentPlaylist, function(err, tracks) {
				setPlaylistsTracks(tracks)
				dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: tracks })
			})
			dispatch({ type: 'ADD_CURRENT_TRACK_INDEX', payload: 1 })
		}
	};

	const _onPlay = (event) => {
		if (videoElement) {
			setVideoData(videoElement.target.getVideoData())
			setIsPaused(false)
		}
	}

	const _onStateChange = (event) => {
		// -1 (unstarted)
		// 0 (ended)
		// 1 (playing)
		// 2 (paused)
		// 3 (buffering)
		// 5 (video cued)

		if (videoElement) {

			if (event.data === 1) {
				setVideoData(videoElement.target.getVideoData())
				const index = videoElement.target.getPlaylistIndex()
				dispatch({ type: 'ADD_CURRENT_TRACK_INDEX', payload: index + 1 })

				const duration = videoElement.target.getDuration()
				setVideoDuration(duration)

				clearInterval(timer)
				timer = setInterval(() => {
					let currentTime = Math.floor(videoElement.target.getCurrentTime())
					timeBar.current.style.width = Math.floor((currentTime / duration) * 100) + "%"
				}, 1000)
			}

			if (event.data === 0 || event.data === 2 || event.data === -1) {
				clearInterval(timer)
			}
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

	const handleTimeJump = (e) => {
		if (videoElement) {
			const timebarWidth = window.innerWidth
			const ratio = e.clientX / timebarWidth
			const jumpToValue = Math.floor(videoDuration * ratio)

			videoElement.target.seekTo(jumpToValue)
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
			<div className="timebar__wrapper" onClick={ handleTimeJump }>
				<span className="timebar" ref={ timeBar }></span>
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