import { createContext, useReducer, useRef } from 'react'

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_PLAYLIST':
			return { ...state, selectedPlaylist: action.payload }
		case 'CUE_TRACK':
			return {
				...state,
				currentPlaylist: action.payload.playlistId,
				currentTrackIndex: null,
				pendingCueTrack: { playlistId: action.payload.playlistId, videoId: action.payload.videoId, position: action.payload.position }
			}
		case 'CLEAR_PENDING_CUE':
			return { ...state, pendingCueTrack: null }
		case 'SET_CUING_TRACK':
			return { ...state, isCuingTrack: action.payload }
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
		selectedPlaylist: null,
		pendingCueTrack: null,
		isCuingTrack: false,
		playlists: null,
		playlistTitles: null,
		currentTrackIndex: null,
		YTPlayer: null,
		nextPageToken: null,
		playlistTotal: null
	})
	const trackSwitchInProgressRef = useRef(false)

	return (
		<PlaylistContext.Provider value={{ ...state, dispatch, trackSwitchInProgressRef }}>
			{ children }
		</PlaylistContext.Provider>
	)

}