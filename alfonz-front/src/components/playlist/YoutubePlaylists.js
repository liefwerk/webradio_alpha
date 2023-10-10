import useFetch from '../../hooks/useFetch'
import { del } from '../../utils/apiUtils'
import { useEffect } from 'react'

// hooks and context
import { usePlaylistContext } from '../../hooks/usePlaylistContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import YoutubeTitles from '../player/YoutubeTitles'
import { IconX } from '@tabler/icons-react';

function YoutubePlaylists() {

    const { error, isPending, data: fetchedPlaylists } = useFetch('/')

	// context
	const { currentPlaylist, playlists, YTPlayer, dispatch } = usePlaylistContext()
	const { bearerToken } = useAuthContext()

	useEffect(() => {
		if (fetchedPlaylists){
			dispatch({ type: 'ADD_PLAYLISTS', payload: fetchedPlaylists })
			dispatch({ type: 'SELECT_PLAYLIST', payload: fetchedPlaylists[0].playlist_id })
		}
		
		return () => {}
	}, [fetchedPlaylists, dispatch])
		

	const changePlaylist = (playlistID) => {
		dispatch({ type: 'SELECT_PLAYLIST', payload: playlistID })
	}

	const deletePlaylist = (UUID) => {
		del(`/playlists/del/${UUID}/`, bearerToken)
			.then( res => res.json() )
			.then( res => { 
				dispatch({ type: 'DELETE_PLAYLIST', payload: UUID })
			})
			.catch( err => console.log(err) )

	}

	const sendTrackToCue = (trackIndex) => {
		YTPlayer.target.playVideoAt(trackIndex)
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
								className={currentPlaylist === playlist.playlist_id ? "playlist__item selected" : "playlist__item"}
								onClick={() => { changePlaylist(playlist.playlist_id) }}>
								<span className="playlist__name">{ playlist.name }</span>
								{bearerToken && (
									<button 
										onClick={() => { deletePlaylist(playlist.id) }}
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
