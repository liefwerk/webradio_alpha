import useFetch from '../../hooks/useFetch'
import { del } from '../../utils/apiUtils'
import { useEffect } from 'react'

// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import YoutubeTitles from './YoutubeTitles'
import { IconX } from '@tabler/icons-react';

function YoutubePlaylists() {

    const { error, isPending, data: fetchedPlaylists } = useFetch('/')

	// context
	const { currentPlaylist, selectedPlaylist, playlists, YTPlayer, dispatch, trackSwitchInProgressRef } = usePlaylistContext()
	const { bearerToken } = useAuthContext()

	useEffect(() => {
		if (fetchedPlaylists){
			dispatch({ type: 'ADD_PLAYLISTS', payload: fetchedPlaylists })
		}
		
		return () => {}
	}, [fetchedPlaylists, dispatch])
		

	const changePlaylist = (playlistID) => {
		dispatch({ type: 'SELECT_PLAYLIST', payload: playlistID })
	}

	const deletePlaylist = (UUID) => {
		del(`/playlists/del/${UUID}/`, bearerToken)
			.then(() => {
				dispatch({ type: 'DELETE_PLAYLIST', payload: UUID })
			})
			.catch((err) => console.log(err))
	}

	const sendTrackToCue = (track) => {
		dispatch({ type: 'SET_CUING_TRACK', payload: true })
		const position = typeof track.position === 'number' ? track.position : 0
		// Switching to a different playlist: set currentPlaylist and pendingCueTrack; player will cue when ready
		if (track.playlistId !== currentPlaylist) {
			dispatch({
				type: 'CUE_TRACK',
				payload: { playlistId: track.playlistId, videoId: track.videoId, position }
			})
			return
		}
		if (!YTPlayer?.target) return
		try {
			if (trackSwitchInProgressRef) trackSwitchInProgressRef.current = true
			const playerPlaylist = YTPlayer.target.getPlaylist()
			if (Array.isArray(playerPlaylist) && track.videoId) {
				const playerIndex = playerPlaylist.indexOf(track.videoId)
				if (playerIndex !== -1) {
					YTPlayer.target.playVideoAt(playerIndex)
					return
				}
			}
			YTPlayer.target.playVideoAt(position)
		} catch (err) {
			dispatch({ type: 'SET_CUING_TRACK', payload: false })
			console.warn('playVideoAt failed:', err)
		}
	}

    return (
		<div className="view playlists playlists--youtube">
			<div className="playlist-list">
				{ error && <p>{ error }</p> }
				{ isPending && <p>IsPending</p> }
				<ul className="playlist__items">
					{ playlists && playlists.map( ( playlist, index ) => {
						return (
							<li
								key={ playlist.id }
								className={selectedPlaylist === playlist.playlist_id ? "playlist__item selected" : "playlist__item"}
								onClick={() => { changePlaylist(playlist.playlist_id) }}>
								<span className="playlist__name">{ playlist.name }</span>
								{bearerToken && (
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation()
											deletePlaylist(playlist.id)
										}}
										className='playlist__button'>
											<IconX />
									</button>
								)}
							</li>
						)
					} ) }
				</ul>
			</div>
			<YoutubeTitles sendTrackToCue={ sendTrackToCue } />
		</div>
    );
    
}

export default YoutubePlaylists;
