import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../services/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'


export const store = configureStore ({
    reducer: {
      auth: authReducer,
    },

    // middleware: (getDefaultMiddleware) =>
    // 	getDefaultMiddleware().concat(apiSlice.middleware),
  	// devTools: true,
})