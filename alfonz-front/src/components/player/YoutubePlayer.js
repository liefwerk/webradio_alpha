import { useEffect, useState, useRef } from 'react'
// https://github.com/tjallingt/react-youtube
import YouTube from "react-youtube";

// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext';

// components
import PlayerControls from './PlayerControls'

let videoElement = null
let timer

function Player() {
	const { currentPlaylist, YTPlayer, playlistTitles, dispatch, trackSwitchInProgressRef, pendingCueTrack, isCuingTrack } = usePlaylistContext()
	const [isPaused, setIsPaused] = useState(true)
	const [videoData, setVideoData] = useState(null)
	const [videoDuration, setVideoDuration] = useState(0)
	const timeBar = useRef(null)

	// https://developers.google.com/youtube/iframe_api_reference
	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			listType: 'playlist',
			list: currentPlaylist
		}
	}

	useEffect(() => {
		if (videoElement) {
			if (isPaused) {
				videoElement.target.pauseVideo();
			} else {
				videoElement.target.playVideo();
			}
		}
	}, [isPaused])

	const _onReady = (event) => {
		videoElement = event
		dispatch({ type: 'ADD_YT_PLAYER', payload: event })

		if (!currentPlaylist) return

		// Cue and play pending track when we've just switched playlist (defer so playlist is ready)
		if (pendingCueTrack && pendingCueTrack.playlistId === currentPlaylist) {
			if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = true
			const target = event.target
			const position = typeof pendingCueTrack.position === 'number' ? pendingCueTrack.position : 0
			const videoId = pendingCueTrack.videoId
			const cueAndPlay = (retryCount = 0) => {
				try {
					if (!target || typeof target.getPlaylist !== 'function') return
					const playerPlaylist = target.getPlaylist()
					const playlistReady = Array.isArray(playerPlaylist) && playerPlaylist.length > 0
					if (!playlistReady && retryCount < 3) {
						setTimeout(() => cueAndPlay(retryCount + 1), 200)
						return
					}
					if (playlistReady && videoId) {
						const idx = playerPlaylist.indexOf(videoId)
						if (idx !== -1) {
							target.playVideoAt(idx)
						} else {
							target.playVideoAt(position)
						}
					} else {
						target.playVideoAt(position)
					}
					if (typeof target.playVideo === 'function') target.playVideo()
				} catch (err) {
					if (retryCount < 3) setTimeout(() => cueAndPlay(retryCount + 1), 200)
					else {
						dispatch({ type: 'SET_CUING_TRACK', payload: false })
						console.warn('Cue track failed:', err)
					}
				}
			}
			setTimeout(() => cueAndPlay(0), 400)
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
		// console.log(event.data)

		if (videoElement) {

			if (event.data === 1) {
				if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = false
				dispatch({ type: 'CLEAR_PENDING_CUE' })
				dispatch({ type: 'SET_CUING_TRACK', payload: false })
				setIsPaused(false)
				const videoData = videoElement.target.getVideoData()
				setVideoData(videoData)
				// Use API position for highlighting (playlist list includes private/deleted; player index does not)
				const videoId = videoData?.video_id
				const track = playlistTitles?.find((t) => t.videoId === videoId)
				const displayIndex = track != null ? track.position + 1 : videoElement.target.getPlaylistIndex() + 1
				dispatch({ type: 'ADD_CURRENT_TRACK_INDEX', payload: displayIndex })

				const duration = videoElement.target.getDuration()
				setVideoDuration(duration)

				clearInterval(timer)
				timer = setInterval(() => {
					let currentTime = Math.floor(videoElement.target.getCurrentTime())
					timeBar.current.style.width = Math.floor((currentTime / duration) * 100) + "%"
				}, 1000)
			}

			if (event.data === 0 || event.data === 5) {
				// Ended or cued: clear track-switch flag so we don't get stuck
				if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = false
			}

			if (event.data === 0 || event.data === 2 || event.data === -1) {
				clearInterval(timer)
				// Don't treat "paused" as user pause when we're switching to another track (playVideoAt)
				if (!trackSwitchInProgressRef?.current) {
					setIsPaused(true)
				}
			}
		}
	}

	const _onError = (event) => {
		console.log(event)
		if (event.data && videoElement) {
			// setToNextVideo()
			console.log(videoElement.target)
			// videoElement.target.playVideoAt(currentTrackIndex + 10)
		} // has error
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
			const jumpToValue = videoDuration * ratio

			videoElement.target.seekTo(jumpToValue)
		}
	}

    return (
		<>
			{ currentPlaylist && (
				<div id="video-player--yt" className="video-player video-player--yt">
					<YouTube
						key={ currentPlaylist }
						opts={ opts }
						onError={ _onError }
						onReady={ _onReady }
						onPlay={ _onPlay }
						onStateChange={ _onStateChange } />
				</div>
			) }
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
				isPaused={ isPaused }
				isCuingTrack={ isCuingTrack } />
		</>
	)
}

export default Player;