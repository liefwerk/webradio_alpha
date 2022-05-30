import { createContext, useReducer } from 'react'

export const PlaylistContext = createContext()

export const playlistReducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_PLAYLIST':
			return { ...state, playlist: action.payload }
		default:
			return state
	}
}

export const PlaylistContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(playlistReducer, { 
		playlist: null,
	})

	console.log('PlaylistContext state:', state)

	return (
		<PlaylistContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</PlaylistContext.Provider>
	)

}