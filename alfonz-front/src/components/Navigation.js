import { Link } from "react-router-dom";

function Navigation() {

	return (
		<nav className="navigation">
			<Link to="/">Home</Link> |{" "}
			<Link to="add">Add Playlist</Link> |{" "}
			<Link to="login">Login</Link>
		</nav>
    );
    
}

export default Navigation;