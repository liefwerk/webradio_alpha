import { useCallback, useEffect } from 'react';
// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext';
import { getVideosTitle } from '../../utils/ytUtils';

function YoutubeTitles({ sendTrackToCue }) {
	const { playlistTitles,
		currentTrackIndex,
		currentPlaylist,
		selectedPlaylist,
		nextPageToken,
		playlistTotal,
		dispatch } = usePlaylistContext()

	// Fetch titles for the selected playlist (the list we show)
	useEffect(() => {
		if (!selectedPlaylist) {
			dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: null })
			dispatch({ type: 'EDIT_NEXT_PAGE_TOKEN', payload: null })
			dispatch({ type: 'ADD_PLAYLISTS_TITLE_TOTAL', payload: null })
			return
		}
		getVideosTitle(selectedPlaylist, function(err, response) {
			if (err || !response) return
			dispatch({ type: 'ADD_PLAYLISTS_TITLES', payload: response.playlistItems })
			dispatch({ type: 'EDIT_NEXT_PAGE_TOKEN', payload: response.nextPageToken })
			dispatch({ type: 'ADD_PLAYLISTS_TITLE_TOTAL', payload: response.totalResults })
		})
	}, [selectedPlaylist, dispatch])

	const handleIntersect = useCallback((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && selectedPlaylist) {
				if (!playlistTitles || playlistTitles.length >= playlistTotal) {
					observer.unobserve(entry.target);
				} else {
					getVideosTitle(selectedPlaylist, function(err, response) {
						if (err || !response) return
						dispatch({ type: 'PUSH_PLAYLISTS_TITLES', payload: response.playlistItems })
						dispatch({ type: 'EDIT_NEXT_PAGE_TOKEN', payload: response.nextPageToken })
						dispatch({ type: 'ADD_PLAYLISTS_TITLE_TOTAL', payload: response.totalResults })
					}, () => {}, nextPageToken)
					observer.unobserve(entry.target);
				}
			}
		})
	}, [nextPageToken, selectedPlaylist, playlistTitles, playlistTotal, dispatch])

	useEffect(() => {
		const playlistsList = document.querySelector(".playlist-tracks").children
		if (playlistsList.length !== 0) {
			let lastElement = playlistsList[playlistsList.length - 1]
			let observer

			let options = {
				root: document.querySelector(".playlist-tracks"),
				rootMargin: "0px",
				threshold: 1.0,
			}
	
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(lastElement);
			
			return () => {
				observer.disconnect()
			}
		}

	}, [playlistTitles, handleIntersect])
		
	const printPlaylistTrackClasses = (currentTrackIndex, track) => {
		if (currentTrackIndex === track.position + 1 && currentPlaylist === track.playlistId) {
			return "playlist-track playing"
		} else if (track.title === "Deleted video" || track.title === "Private video") {
			return "playlist-track deleted"
		} else {
			return "playlist-track" 
		}
	}

	const handleTrackToCue = (currentTrackIndex, track) => {
		if (currentTrackIndex === track.position + 1 || track.title === "Deleted video" || track.title === "Private video")
			return
		sendTrackToCue(track)
	}

	const renderPlaylistTitles = playlistTitles && playlistTitles.map(track =>
		<li
			key={ track.videoId ? track.videoId : `${track.playlistId}-${track.position}` }
			onClick={ () => handleTrackToCue(currentTrackIndex, track) }
			className={ printPlaylistTrackClasses(currentTrackIndex, track) }>
			<span className="playlist-track__position">{ track.position + 1 }</span>
			<span className="playlist-track__title">{ track.title }</span>
		</li>
	)

    return (
		<ul className="playlist-tracks">
			{ renderPlaylistTitles }
		</ul>
	)
}

export default YoutubeTitles;