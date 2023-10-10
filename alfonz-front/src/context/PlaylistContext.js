import { createContext, useReducer } from 'react'

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_PLAYLIST':
			return { ...state, currentPlaylist: action.payload }
		case 'ADD_PLAYLISTS':
			return { ...state, playlists: action.payload }
		case 'ADD_PLAYLISTS_TITLES':
			return { ...state, playlistTitles: action.payload }
		case 'PUSH_PLAYLISTS_TITLES':
			let _playlistTitles = state.playlistTitles.concat(action.payload)
			return { ...state, playlistTitles: _playlistTitles }
		case 'ADD_PLAYLISTS_TITLE_TOTAL':
			return { ...state, playlistTotal: action.payload }
		case 'ADD_CURRENT_TRACK_INDEX':
			return { ...state, currentTrackIndex: action.payload }
		case 'EDIT_NEXT_PAGE_TOKEN':
			return { ...state, nextPageToken: action.payload }
		case 'ADD_YT_PLAYER':
			return { ...state, YTPlayer: action.payload }
		case 'DELETE_PLAYLIST':
			const playlists = state.playlists.filter(playlist => playlist.id !== action.payload)
			return { ...state, playlists: playlists }
		default:
			return state
	}
}

export const PlaylistContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(playlistReducer, { 
		currentPlaylist: null,
		playlists: null,
		playlistTitles: null,
		currentTrackIndex: null,
		YTPlayer: null,
		nextPageToken: null,
		playlistTotal: null
	})

	return (
		<PlaylistContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</PlaylistContext.Provider>
	)

}