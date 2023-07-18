import { useEffect, useState } from 'react'
import { usePlaylistContext } from '../hooks/usePlaylistContext';
import { getVideosTitle } from '../utils/ytUtils';

import YouTube from "react-youtube";
import PlayerControls from './PlayerControls'

let videoElement = null

function Player() {
	const { currentPlaylist } = usePlaylistContext()
	const [isPaused, setIsPaused] = useState(true)
	const [playlistTracks, setPlaylistsTracks] = useState(null)
	const [videoData, setVideoData] = useState(null)

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
			console.log('calling youtube API')
			setPlaylistsTracks(videoElement.target.getPlaylist())
			getVideosTitle(currentPlaylist, function(err, title) {
				setPlaylistsTracks(title)
			})
		}
	}, [currentPlaylist])

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

	const playlistTitles = playlistTracks && playlistTracks.map((item, index) =>
		<li key={item.position}>{ item.title } { item.position }</li>
	)

    return (
		<>
			<div id="video-player--yt" className="video-player video-player--yt">
				<YouTube
					opts={ opts }
					onReady={ _onReady }
					onPlay={ _onPlay } />
			</div>
			{videoData && (
				<p>{ videoData.title }</p>
			)}
			<ul className="playlist-items">
				{playlistTitles}
			</ul>
			<PlayerControls
				togglePause={ togglePause }
				setToNextVideo={ setToNextVideo }
				setToPreviousVideo={ setToPreviousVideo }
				isPaused={ isPaused } />
		</>
	)
}

export default Player;