import { useState } from 'react'
import { getToken } from '../utils/apiUtils'
import { useNavigate } from "react-router-dom";

// hooks and context
import { useAuthContext } from '../hooks/useAuthContext'

function Login() {
	
	const [username, setUsername] = useState('nathanael')
	const [password, setPassword] = useState('')

	// context
	const { dispatch } = useAuthContext()

	// route
	const navigate = useNavigate();
	
	const handleLogin = (e) => {
		e.preventDefault()

		const body = {
			"username": username,
			"password": password
		}

		getToken('/auth/get-token/', body)
			.then(res => {
				console.log(res)
				dispatch({ type: 'ADD_BEARER_TOKEN', payload: res.token })
				navigate("/")
			})
			.catch(err => console.log(err))

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
