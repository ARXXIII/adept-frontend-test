import { configureStore } from '@reduxjs/toolkit'
import companiesSlice from './companies-slice'

export const store = configureStore({
	reducer: {
		companies: companiesSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
