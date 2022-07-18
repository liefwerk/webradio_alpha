import useFetch from '../hooks/useFetch'

// hooks and context
// import { useGetPlaylists } from '../hooks/usePlaylists'
import { usePlaylistContext } from '../hooks/usePlaylistContext'

function YoutubePlaylists() {

    const { error, isPending, data: playlists } = useFetch('/yt')
	
	// context
	const { dispatch } = usePlaylistContext()

	const changePlaylist = (playlist_id) => {
		dispatch({ type: 'SELECT_PLAYLIST', payload: playlist_id })
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
					</div>
				)
			} ) }
		</div>
    );
    
}

export default YoutubePlaylists;
