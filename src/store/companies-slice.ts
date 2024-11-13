import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Company {
	id: string
	name: string
	address: string
	selected: boolean
}

interface CompaniesState {
	companies: Company[]
}

const initialState: CompaniesState = {
	companies: [
		{ id: '1', name: 'Company A', address: 'Address A', selected: false },
		{ id: '2', name: 'Company B', address: 'Address B', selected: false },
		{ id: '3', name: 'Company C', address: 'Address C', selected: false },
	],
}

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		addCompany: (
			state,
			action: PayloadAction<Omit<Company, 'id' | 'selected'>>
		) => {
			const newCompany = {
				id: Date.now().toString(),
				...action.payload,
				selected: false,
			}
			state.companies.push(newCompany)
		},
		removeSelectedCompanies: (state) => {
			state.companies = state.companies.filter(
				(company) => !company.selected
			)
		},
		toggleSelectCompany: (state, action: PayloadAction<string>) => {
			const company = state.companies.find(
				(company) => company.id === action.payload
			)
			if (company) company.selected = !company.selected
		},
		toggleSelectAll: (state, action: PayloadAction<boolean>) => {
			state.companies.forEach(
				(company) => (company.selected = action.payload)
			)
		},
		editCompany: (state, action: PayloadAction<Company>) => {
			const index = state.companies.findIndex(
				(c) => c.id === action.payload.id
			)
			if (index !== -1) state.companies[index] = action.payload
		},
	},
})

export const {
	addCompany,
	removeSelectedCompanies,
	toggleSelectCompany,
	toggleSelectAll,
	editCompany,
} = companiesSlice.actions
export default companiesSlice.reducer
