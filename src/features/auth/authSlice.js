import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

// Signup user
export const signup = createAsyncThunk(
  'auth/signup',
	async (user, thunkAPI) => {
		try {
      return await authService.signup(user)
    } catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)


// Login user
export const login = createAsyncThunk(
  'auth/login',
	async (user, thunkAPI) => {
		try {
      return await authService.login(user)
    } catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Logout user
export const logout = createAsyncThunk(
	'auth/logout',
	async (user, thunkAPI) => {
		try {
      await authService.logout(user)	// no action.payload needed
    } catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
	reducers: {
    reset: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
	},
  extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.loading = true
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.error = null
			})
			.addCase(signup.rejected, (state, action) => {
				state.user = null
				state.loading = false
				state.error = action.payload
			})
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.user = null
				state.loading = false
				state.error = action.payload
			})
			.addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer