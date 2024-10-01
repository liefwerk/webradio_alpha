import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_BEARER_TOKEN':
			localStorage.setItem('bearerToken', action.payload);
			return { ...state, bearerToken: action.payload }
		case 'DELETE_BEARER_TOKEN':
			console.log("called DELETE_BEARER_TOKEN")
			localStorage.removeItem('bearerToken');
			return { ...state, bearerToken: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {

	const initialState = { bearerToken: null }
	const localState = { bearerToken: localStorage.getItem("bearerToken") }

	const [state, dispatch] = useReducer(authReducer, localState || initialState)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{ children }
		</AuthContext.Provider>
	)

}