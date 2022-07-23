import { useState } from 'react'
import { post } from '../utils/apiUtils'

function AddPlaylist() {
	
	const [name, setName] = useState('')
	const [playlistID, setPlaylistID] = useState('')
	
	const handleAddPlaylist = (e) => {
		e.preventDefault()

		const body = {
			"name": name,
			"playlist_id": playlistID,
		}

		post('/single/yt', body)
			.then( res => {
				console.log(res)
			} )
			.catch( err => console.log('error', err) )

		// fetch('http://127.0.0.1:5000/playlist/yt/', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(body)
		// }).then( res => {
		// 	console.log(res)
		// }).catch( err => console.log(err))

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
