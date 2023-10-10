// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext';
import { useEffect } from 'react';

function YoutubeTitles({ sendTrackToCue }) {
	const { playlistTitles, currentTrackIndex } = usePlaylistContext()

	const handleIntersect = (entries, observer) => {

		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// can start loading new titles
				console.log("load new titles")
				observer.unobserve(entry.target);
			}
		})
	}

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

	}, [playlistTitles])
		
	const printPlaylistTrackClasses = (currentTrackIndex, track) => {
		if (currentTrackIndex === track.position + 1) {
			return "playlist-track playing"
		} else if (track.title === "Deleted video") {
			return "playlist-track deleted"
		} else {
			return "playlist-track" 
		}
	}

	const handleTrackToCue = (trackIndex, currentTrackIndex, track) => {
		if (currentTrackIndex === track.position + 1 || track.title === "Deleted video")
			return
		
		sendTrackToCue(trackIndex)
	}

	const renderPlaylistTitles = playlistTitles && playlistTitles.map(track =>
		<li
			key={ track.position }
			onClick={ () => handleTrackToCue(track.position, currentTrackIndex, track) }
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