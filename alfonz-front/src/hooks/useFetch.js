import { useState, useEffect } from "react";

const useFetch = (url, method, body) => {

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000/playlists" : "http://play.natjs.fr/playlists";

		let fullUrl = baseURL + url
		
		fetch(fullUrl, { 
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.cxWxLJd70YK20JoUohi4bVS1VY2rF01ha2bTzbveJ1I'
			},
			body: JSON.stringify(body)
		},
		{ signal: abortCont.signal })
			.then(res => {
				if (!res.ok) { // error coming back from server
					throw Error('could not fetch the data for that resource');
				} 
				console.log('fetched');
				return res.json();
			})
			.then(data => {
				setIsPending(false);
				setData(data);
				setError(null);
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