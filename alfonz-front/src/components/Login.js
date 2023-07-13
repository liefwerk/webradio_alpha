import { post } from '../utils/apiUtils'

function Login() {
	
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const handleLogin = (e) => {
		e.preventDefault()

		const body = {
			"username": username,
			"password": password
		}

		post('/', body)
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

export default Login;
