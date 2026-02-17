import { useState } from 'react'
import { post } from '../../utils/apiUtils'

// hooks and context
import { useAuthContext } from '../../hooks/useAuthContext'

function AddPlaylist() {

	const [name, setName] = useState('')
	const [playlistID, setPlaylistID] = useState('')
	const [message, setMessage] = useState(null) // { type: 'success' | 'error', text: string }

	const { bearerToken } = useAuthContext()

	const handleAddPlaylist = (e) => {
		e.preventDefault()
		setMessage(null)

		const body = {
			"name": name,
			"playlist_id": playlistID,
			"type": "youtube"
		}

		post('/playlists/', body, bearerToken)
			.then(() => {
				setMessage({ type: 'success', text: 'Playlist added successfully.' })
				setName('')
				setPlaylistID('')
			})
			.catch((err) => {
				const text = err?.error || err?.message || 'Failed to add playlist.'
				setMessage({ type: 'error', text })
			})
	}

	return (
		<div className="view">
			{ message && (
				<p className={ message.type === 'success' ? 'add-playlist__message add-playlist__message--success' : 'add-playlist__message add-playlist__message--error' }>
					{ message.text }
				</p>
			) }
			<form className='add-playlist' onSubmit={ handleAddPlaylist }>
				<label>
					<input
						value={ name }
						onChange={ (e) => setName(e.target.value) }
						placeholder="Name of the playlist"
						type="text" />
				</label>
				<label>
					<input
						value={ playlistID }
						onChange={ (e) => setPlaylistID(e.target.value) }
						placeholder="ID for the playlist"
						type="text" />
				</label>
				<button type="submit">Add playlist</button>
			</form>
		</div>
	);
    
}

export default AddPlaylist;
