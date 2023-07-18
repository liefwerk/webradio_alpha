import qs from 'query-string'
import { Buffer } from 'buffer';

// Documentation:
// https://developers.google.com/youtube/v3/docs/playlistItems/list

const DEFAULT_KEY = Buffer.from('QUl6YVN5RGhsLUJKU3UwWmMwaGtkNkFJYk41RUVSOFkzRVZyX1Vj', 'base64') + ''

export const getVideosTitle = (id, key, cb) => {

	if (typeof key === 'function') {
        cb = key
        key = DEFAULT_KEY
    }

    let url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    url += '?' + qs.stringify({
        key: key,
        part: 'snippet',
        playlistId: id
    })

    fetch(url)
        .then(res => res.json())
        .then((res) => {
			
			let playlistItems = res.items.map((item) => {
				return { title: item.snippet.title, position: item.snippet.position }
			})

            if (playlistItems !== undefined)
    			cb(null, playlistItems)
            else
                throw new Error("There is no items in the playlist.")
		})
		.catch((err) => {
			console.log('error', err)
			cb(err, null)
		})

}
