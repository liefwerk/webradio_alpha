import { useState } from 'react'

// hooks and context
import { usePlaylistContext } from '../hooks/usePlaylistContext';


function Player() {
	const { playlistTitles } = usePlaylistContext()

	const renderPlaylistTitles = playlistTitles && playlistTitles.map((item, index) =>
		<li key={item.position} className="playlist-item">
			<span className="playlist-item__position">{ item.position + 1 }</span>
			<span className="playlist-item__title">{ item.title }</span>
		</li>
	)

    return (
		<ul className="playlist-items">
			{renderPlaylistTitles}
		</ul>
	)
}

export default Player;