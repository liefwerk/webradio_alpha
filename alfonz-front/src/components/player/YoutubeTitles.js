// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext';

function YoutubeTitles({ sendTrackToCue }) {
	const { playlistTitles, currentTrackIndex } = usePlaylistContext()

		
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
			{ currentTrackIndex }
			{ renderPlaylistTitles }
		</ul>
	)
}

export default YoutubeTitles;