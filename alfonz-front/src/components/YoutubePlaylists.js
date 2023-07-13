import useFetch from '../hooks/useFetch'
import { del } from '../utils/apiUtils'
import { useEffect } from 'react'

// hooks and context
import { usePlaylistContext } from '../hooks/usePlaylistContext'
import { useAuthContext } from '../hooks/useAuthContext'

function YoutubePlaylists() {

    const { error, isPending, data: fetchedPlaylists } = useFetch('/')

	// context
	const { playlists, dispatch } = usePlaylistContext()
	const { bearerToken } = useAuthContext()

	useEffect(() => {
		if (fetchedPlaylists){
			dispatch({ type: 'ADD_PLAYLISTS', payload: fetchedPlaylists })
			// dispatch({ type: 'SELECT_PLAYLIST', payload: fetchedPlaylists[0].playlist_id })
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

    return (
		<div className='playlists playlists--youtube'>
			{ error && <p>{ error }</p> }
			{ isPending && <p>IsPending</p> }
			{ playlists && playlists.map( ( playlist, index ) => {
				return (
					<div key={ playlist.id } className="playlist__item">
						<p className="playlist__name">{ playlist.name }</p>
						<p className="playlist__id">{ playlist.playlist_id }</p>
						<button 
							onClick={() => { changePlaylist(playlist.playlist_id) }}
							className="playlist__button">
								Select this playlist
						</button>
						<button 
							onClick={() => { deletePlaylist(playlist.id) }}
							className='playlist__button'>
								Delete this playlist
						</button>
					</div>
				)
			} ) }
		</div>
    );
    
}

export default YoutubePlaylists;
