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
	const { currentPlaylist, playlistTitles, dispatch, trackSwitchInProgressRef, pendingCueTrack, isCuingTrack } = usePlaylistContext()
	const [isPaused, setIsPaused] = useState(true)
	const [videoData, setVideoData] = useState(null)
	const [videoDuration, setVideoDuration] = useState(0)
	const timeBar = useRef(null)
	const transitioningToNextRef = useRef(false)
	const youtubeRef = useRef(null)
	const playNextScheduledRef = useRef(false)
	const cueAndPlayTimeoutRef = useRef(null)

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
			// Don't pause during ended → next track transition (would stop auto-advance)
			if (isPaused && transitioningToNextRef.current) return
			if (isPaused) {
				videoElement.target.pauseVideo();
			} else {
				videoElement.target.playVideo();
			}
		}
	}, [isPaused])

	// Clear cue timeout on unmount so we don't call a destroyed player
	useEffect(() => {
		return () => {
			if (cueAndPlayTimeoutRef.current) {
				clearTimeout(cueAndPlayTimeoutRef.current)
				cueAndPlayTimeoutRef.current = null
			}
		}
	}, [])

	const _onReady = (event) => {
		videoElement = event
		dispatch({ type: 'ADD_YT_PLAYER', payload: event })

		if (!currentPlaylist) return

		// Cue and play pending track when we've just switched playlist (defer so playlist is ready)
		if (pendingCueTrack && pendingCueTrack.playlistId === currentPlaylist) {
			if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = true
			const position = typeof pendingCueTrack.position === 'number' ? pendingCueTrack.position : 0
			const videoId = pendingCueTrack.videoId
			const cueAndPlay = (retryCount = 0) => {
				const target = videoElement?.target
				if (!target || typeof target.getPlaylist !== 'function') {
					if (retryCount < 3) {
						cueAndPlayTimeoutRef.current = setTimeout(() => cueAndPlay(retryCount + 1), 200)
					} else {
						dispatch({ type: 'SET_CUING_TRACK', payload: false })
					}
					return
				}
				const isPlayerDestroyed = (err) =>
					err && (String(err.message || '').includes('this.g') || String(err.message || '').includes("can't access property"))
				const runCue = (playerPlaylist) => {
					const list = Array.isArray(playerPlaylist) ? playerPlaylist : []
					const playlistReady = list.length > 0
					const t = videoElement?.target
					if (!t) return
					try {
						if (playlistReady && videoId) {
							const idx = list.indexOf(videoId)
							if (idx !== -1) {
								t.playVideoAt(idx)
							} else {
								t.playVideoAt(position)
							}
						} else {
							t.playVideoAt(position)
						}
						if (typeof t.playVideo === 'function') t.playVideo()
					} catch (err) {
						if (!isPlayerDestroyed(err) && retryCount < 3) {
							cueAndPlayTimeoutRef.current = setTimeout(() => cueAndPlay(retryCount + 1), 200)
						} else {
							dispatch({ type: 'SET_CUING_TRACK', payload: false })
							if (!isPlayerDestroyed(err)) console.warn('Cue track failed:', err)
						}
					}
				}
				try {
					const pl = target.getPlaylist()
					if (pl != null && typeof pl.then === 'function') {
						pl.then(runCue).catch((err) => {
							if (!isPlayerDestroyed(err) && retryCount < 3) {
								cueAndPlayTimeoutRef.current = setTimeout(() => cueAndPlay(retryCount + 1), 200)
							} else {
								dispatch({ type: 'SET_CUING_TRACK', payload: false })
								if (!isPlayerDestroyed(err)) console.warn('Cue track failed:', err)
							}
						})
					} else {
						runCue(pl)
					}
				} catch (err) {
					if (!isPlayerDestroyed(err) && retryCount < 3) {
						cueAndPlayTimeoutRef.current = setTimeout(() => cueAndPlay(retryCount + 1), 200)
					} else {
						dispatch({ type: 'SET_CUING_TRACK', payload: false })
						if (!isPlayerDestroyed(err)) console.warn('Cue track failed:', err)
					}
				}
			}
			cueAndPlayTimeoutRef.current = setTimeout(() => cueAndPlay(0), 500)
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
		console.log(event.data)

		if (videoElement) {

			if (event.data === 1) {
				transitioningToNextRef.current = false
				playNextScheduledRef.current = false
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
				const target = videoElement.target
				timer = setInterval(() => {
					try {
						const ct = target.getCurrentTime()
						const handleTime = (currentTime) => {
							const sec = Math.floor(Number(currentTime))
							if (timeBar.current && duration > 0) {
								timeBar.current.style.width = Math.floor((sec / duration) * 100) + "%"
							}
							// Fallback: ended/onEnd often don't fire in playlist embed; detect when at end
							const nearEnd = duration > 0 && sec >= Math.max(0, duration - 1)
							if (nearEnd) {
								clearInterval(timer)
								schedulePlayNext(target)
							}
						}
						if (ct != null && typeof ct.then === 'function') {
							ct.then(handleTime).catch(() => {})
						} else {
							handleTime(ct)
						}
					} catch (e) {
						// ignore
					}
				}, 1000)
			}

			if (event.data === 0) {
				// Don't set isPaused(false): effect would call playVideo() on the ended video
				schedulePlayNext(event.target)
			}
			if (event.data === 0 || event.data === 5) {
				// Ended or cued: clear track-switch flag so we don't get stuck
				if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = false
			}

			// Next track cued (state 5): ensure it plays in case we didn't come from state 0
			if (event.data === 5) {
				setIsPaused(false)
				try {
					videoElement.target.playVideo()
				} catch (e) {
					// ignore
				}
			}

			if (event.data === 0 || event.data === 2 || event.data === -1) {
				clearInterval(timer)
				// Don't treat "paused" as user pause when we're switching to another track (playVideoAt)
				// Don't set paused on ended (0) — next track will cue (5) and we keep playing
				if (!trackSwitchInProgressRef?.current && event.data !== 0) {
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

	// Shared: when current video ends, advance to next (used by onStateChange(0) and onEnd)
	const schedulePlayNext = (player) => {
		if (playNextScheduledRef.current || !player) return
		playNextScheduledRef.current = true
		transitioningToNextRef.current = true
		const playNext = () => {
			playNextScheduledRef.current = false
			try {
				if (typeof player.nextVideo === 'function') player.nextVideo()
				if (typeof player.playVideo === 'function') player.playVideo()
			} catch (e) {}
		}
		setTimeout(playNext, 250)
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
						ref={ youtubeRef }
						key={ currentPlaylist }
						opts={ opts }
						onError={ _onError }
						onReady={ _onReady }
						onPlay={ _onPlay }
						onEnd={ (e) => schedulePlayNext(e?.target) }
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