import useFetch from "./useFetch";

const usePlaylists = (url, body) => {
	
	const { error, isPending, response } = useFetch(url, 'POST', body)
	
	console.log( 'usePostPlaylists', response )

	return { error, isPending, response }

}

export default usePlaylists