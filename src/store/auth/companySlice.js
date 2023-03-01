import { createSlice } from '@reduxjs/toolkit'

export const initialState = {

}

export const companySlice = createSlice({
	name: 'auth/company',
	initialState,
	reducers: {
        setCompany: (_, action) => action.payload,
        userLoggedOut: () => initialState,
	},
})

export const { setCompany } = companySlice.actions

export default companySlice.reducer