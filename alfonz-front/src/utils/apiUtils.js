const baseURL = 'http://127.0.0.1:5000'

const headers = {
	'Content-Type': 'application/json'
}

export const getToken = (URL, body) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {

		const response = fetch(fullURL, { 
			method: 'POST',
			headers: headers,
			body: JSON.stringify(body)
		})

		resolve(response)
	})
}

export const post = (URL, body, token) => {

	let fullURL = baseURL + URL

	console.log({ ...headers, 'Authorization': `${token}` })
	
	return new Promise((resolve, reject) => {

		const response = fetch(fullURL, { 
			method: 'POST',
			headers: { ...headers, 'Authorization': `${token}` },
			body: JSON.stringify(body)
		})

		resolve(response)
	})
}

export const del = (URL, token) => {

	let fullURL = baseURL + URL
	
	return new Promise((resolve, reject) => {
	
		const response = fetch(fullURL, { 
			method: 'DELETE',
			headers: { ...headers, 'Authorization': `${token}` },
		})

		resolve(response)
	})
}
