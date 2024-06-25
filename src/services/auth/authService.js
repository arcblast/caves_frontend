import axios from "@/app/axios"

const LOGIN_URL = '/users/login'
const LOGOUT_URL = '/users/logout'
const SIGNUP_URL = '/users'

const signup = async (userData) => {
	const response = await axios.post(SIGNUP_URL, userData)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'user', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

// Login user
const login = async (userData) => {
	const response = await axios.post(LOGIN_URL, userData)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'user', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

// Logout user
const logout = async (userData) => {
	const response = await axios.post(LOGOUT_URL, userData)

	localStorage.removeItem('user')
	console.log('Log out')
}

const authService = {
	signup,
	login,
	logout
}

export default authService