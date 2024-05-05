import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import strainReducer from '../features/strain/strainSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'


export const store = configureStore ({
    reducer: {
      auth: authReducer,
      strain: strainReducer
    },

    // middleware: (getDefaultMiddleware) =>
    // 	getDefaultMiddleware().concat(apiSlice.middleware),
  	// devTools: true,
})