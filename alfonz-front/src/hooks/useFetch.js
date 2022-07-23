import { useState, useEffect } from "react";

const useFetch = (url, method, body) => {

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		const baseURL = "http://127.0.0.1:5000/playlists";

		let fullUrl = baseURL + url
		
		fetch(fullUrl, { 
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		},
		{ signal: abortCont.signal })
			.then(res => {
				if (!res.ok) { // error coming back from server
					throw Error('could not fetch the data for that resource');
				} 
				return res.json();
			})
			.then(data => {
				setIsPending(false);
				setData(data);
				setError(null);
				console.log(data)
			})
			.catch(err => {
				if (err.name === 'AbortError') {
					console.log('fetch aborted')
				} else {
					// auto catches network / connection error
					setIsPending(false);
					setError(err.message);
				}
			})

		// abort the fetch
		return () => abortCont.abort();
	}, [url, method, body])
		
	return { data, isPending, error };
}

export default useFetch