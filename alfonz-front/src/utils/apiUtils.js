const baseURL = 'http://127.0.0.1:5000/playlists'

export const post = (URL, body) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {
		
		console.log(body)
		console.log(JSON.stringify(body))

		fetch(fullURL, { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
	})
}

export const del = (URL) => {

	let fullURL = baseURL + URL
	console.log(fullURL)
	
	return new Promise((resolve, reject) => {
	
		fetch(fullURL, { 
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	})
}
