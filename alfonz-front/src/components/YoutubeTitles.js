// hooks and context
import { usePlaylistContext } from '../hooks/usePlaylistContext';


function Player() {
	const { playlistTitles, currentTrackIndex } = usePlaylistContext()

	const renderPlaylistTitles = playlistTitles && playlistTitles.map(track =>
		<li
			key={ track.position }
			className={ currentTrackIndex === track.position + 1 ? "playlist-track playing" : "playlist-track"}>
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

export default Player;