import { useState } from 'react'
import { post } from '../utils/apiUtils'

function Login() {
	
	const [username, setUsername] = useState('nathanael')
	const [password, setPassword] = useState('')
	
	const handleLogin = (e) => {
		e.preventDefault()

		const body = {
			"username": username,
			"password": password
		}

		console.log(body)

		post('/auth/get-token/', body)
			.then(res => res.json() )
			.then(res => console.log(res) )
			.catch(err => console.log('error', err))

	}

	const handleChangePassword = (value) => {
		setPassword(value);
	}

	const handleChangeUsername = (value) => {
		setUsername(value);
	}

    return (
		<form className='login' onSubmit={ handleLogin }>
			<label>
				<input
					value={ username }
					onChange={ (e) => handleChangeUsername(e.target.value) }
					placeholder="Your username" 
					type="text" />
			</label>
			<label>
				<input
					onChange={ (e) => handleChangePassword(e.target.value) }
					placeholder="************" 
					type="password" />
			</label>
			<button type="">Login</button>
		</form>
    );
    
}

export default Login;
