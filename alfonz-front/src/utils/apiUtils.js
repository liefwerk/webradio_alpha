const baseURL = 'http://127.0.0.1:5000/playlists'

const headers = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.cxWxLJd70YK20JoUohi4bVS1VY2rF01ha2bTzbveJ1I'
}

export const post = (URL, body) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {

		fetch(fullURL, { 
			method: 'POST',
			headers: headers,
			body: JSON.stringify(body)
		})
	})
}

export const del = (URL) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {
	
		fetch(fullURL, { 
			method: 'DELETE',
			headers: headers
		})
	})
}
