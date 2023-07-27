import { useState } from 'react'
import { post } from '../../utils/apiUtils'

// hooks and context
import { useAuthContext } from '../../hooks/useAuthContext'

function AddPlaylist() {
	
	const [name, setName] = useState('')
	const [playlistID, setPlaylistID] = useState('')

	// context
	const { bearerToken } = useAuthContext()
	
	const handleAddPlaylist = (e) => {
		e.preventDefault()

		const body = {
			"name": name,
			"playlist_id": playlistID,
			"type": "youtube"
		}

		post('/playlists/', body, bearerToken)
			.then( res => {
				console.log(res)
			} )
			.catch( err => console.log('error', err) )

	}

	const handleChangeID = (value) => {
		setPlaylistID(value);
	}

	const handleChangeName = (value) => {
		setName(value);
	}

    return (
		<form className='add-playlist' onSubmit={ handleAddPlaylist }>
			<label>
				<input
					// value={ data.name }
					onChange={ (e) => handleChangeName(e.target.value) }
					placeholder="Name of the playlist" 
					type="text" />
			</label>
			<label>
				<input
					// value={ data.playlistID }
					onChange={ (e) => handleChangeID(e.target.value) }
					placeholder="ID for the playlist" 
					type="text" />
			</label>
			<button type="">Add playlist</button>
		</form>
    );
    
}

export default AddPlaylist;
