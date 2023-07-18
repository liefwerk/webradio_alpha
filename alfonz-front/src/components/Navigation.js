import { Link } from "react-router-dom";

// hooks and context
import { useAuthContext } from '../hooks/useAuthContext'

function Navigation() {

	const { bearerToken, dispatch } = useAuthContext()
	
	const handleLogOut = () => {
		dispatch({ type: 'DELETE_BEARER_TOKEN', payload: null })
	}

	return (
		<nav className="navigation">
			<Link to="/">Home</Link> 
			<Link to="add">Add Playlist</Link> 
			{ !bearerToken && <Link to="login">Login</Link> }
			{ bearerToken && <button onClick={ handleLogOut }>Logout</button> }
		</nav>
    );
    
}

export default Navigation;