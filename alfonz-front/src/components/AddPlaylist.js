import { usePlaylists } from "../hooks/usePlaylists";
import { useState } from 'react'

function AddPlaylist() {

	const { playlistID, setPlaylistID } = useState(null)
	const { name, setName } = useState(null)
	const { addPlaylist } = usePlaylists('/yt', 'POST', body)

	const handleAddPlaylist = (data) => {
		error.preventDefault()

		const body = {
			playlist_id: playlistID,
			name: name
		}
		
		console.log(body)

		const { error, isPending, response } = addPlaylist( '/playlists', body )
		
		console.log(response)

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
