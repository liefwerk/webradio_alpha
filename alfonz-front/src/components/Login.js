import { useState } from 'react'
import { getToken } from '../utils/apiUtils'

// hooks and context
import { useAuthContext } from '../hooks/useAuthContext'

function Login() {
	
	const [username, setUsername] = useState('nathanael')
	const [password, setPassword] = useState('')

	// context
	const { dispatch } = useAuthContext()
	
	const handleLogin = (e) => {
		e.preventDefault()

		const body = {
			"username": username,
			"password": password
		}

		getToken('/auth/get-token/', body)
			.then(res => res.json() )
			.then(res => { 
				console.log(res.token)
				dispatch({ type: 'ADD_BEARER_TOKEN', payload: res.token })
			})
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
