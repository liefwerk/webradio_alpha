const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'http://play.natjs.fr'

const headers = {
	'Content-Type': 'application/json'
}

export const getToken = (URL, body) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {

		fetch(fullURL, { 
			method: 'POST',
			headers: headers,
			body: JSON.stringify(body)
		})
		.then(res => res.json())
		.then(res => {
			if (!res.error)
				resolve(res)
			else
				reject(res)
		})
	})
}

export const post = (URL, body, token) => {

	let fullURL = baseURL + URL
	return new Promise((resolve, reject) => {

		fetch(fullURL, { 
			method: 'POST',
			headers: { ...headers, 'Authorization': `${token}` },
			body: JSON.stringify(body)
		})
		.then(res => res.json())
		.then(res => {
			if (!res.error)
				resolve(res)
			else
				reject(res)
		})
	})
}

export const del = (URL, token) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {
	
		fetch(fullURL, { 
			method: 'DELETE',
			headers: { ...headers, 'Authorization': `${token}` },
		})
		.then(res => res.json())
		.then(res => {
			if (!res.error)
				resolve(res)
			else
				reject(res)
		})

	})
}