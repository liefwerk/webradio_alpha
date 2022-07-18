// import { useFetch } from "../hooks/useFetch";
import { useState } from 'react'
import usePlaylists from '../hooks/usePlaylist'

function AddPlaylist() {

	const { playlistID, setPlaylistID } = useState(null)
	const { name, setName } = useState(null)
	const { error, isPending, response } = usePlaylists( '/playlists', body )
	
	const handleAddPlaylist = (e) => {
		e.preventDefault()
		
		setPlaylistID({ playlistID: playlistID })
		setName({ name: name })
		
		const body = {
			playlist_id: playlistID,
			name: name
		}
	

		console.log(response)
		console.log(error, isPending)

	}

    return (
		<form className='add-playlist' onSubmit={ handleAddPlaylist }>
			<label>
				<input
					value={ name }
					placeholder="Name of the playlist" 
					type="text" />
			</label>
			<label>
				<input 
					value={ playlistID }
					placeholder="ID for the playlist" 
					type="text" />
			</label>

		</form>
    );
    
}

export default AddPlaylist;
