import useFetch from '../hooks/useFetch'
import { del } from '../utils/apiUtils'
import { useEffect } from 'react'

// hooks and context
import { usePlaylistContext } from '../hooks/usePlaylistContext'

function YoutubePlaylists() {

    const { error, isPending, data: fetchedPlaylists } = useFetch('/yt')
	const { playlists } = usePlaylistContext()

	// context
	const { dispatch } = usePlaylistContext()

	useEffect(() => {
	  if (fetchedPlaylists){
		dispatch({ type: 'ADD_PLAYLISTS', payload: fetchedPlaylists })
	  }

	  console.log(playlists)
	
	  return () => {}
	}, [fetchedPlaylists])
	

	const changePlaylist = (playlistID) => {
		dispatch({ type: 'SELECT_PLAYLIST', payload: playlistID })
	}

	const deletePlaylist = (UUID) => {
		console.log(UUID)
		del(`/single/yt/${UUID}`)
			.then( res => console.log(res) )
			.catch( err => console.log(err) )
	}

    return (
		<div className='playlists playlists--youtube'>
			{ error && <p>{ error }</p> }
			{ isPending && <p>IsPending</p> }
			{ playlists && playlists.map( ( playlist, index ) => {
				return (
					<div key={ playlist.id }>
						<p className="playlist__name">{ playlist.name }</p>
						<p className="playlist__id">{ playlist.playlist_id }</p>
						<button 
							onClick={() => { changePlaylist(playlist.playlist_id) }}
							className='playlist__button'>
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
