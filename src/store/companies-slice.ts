import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Company {
	id: string
	name: string
	address: string
	selected: boolean
}

interface CompaniesState {
	companies: Company[]
	sortBy: 'name' | 'address' | null
	sortDirection: 'asc' | 'desc'
}

const initialState: CompaniesState = {
	companies: [
		{
			id: '1',
			name: 'Company TestA',
			address: 'Address TestA',
			selected: false,
		},
		{
			id: '2',
			name: 'Company TestB',
			address: 'Address TestB',
			selected: false,
		},
		{
			id: '3',
			name: 'Company TestC',
			address: 'Address TestC',
			selected: false,
		},
	],
	sortBy: null,
	sortDirection: 'asc',
}

// Асинхронный thunk для загрузки данных с API
// export const fetchCompanies = createAsyncThunk(
// 	'companies/fetchCompanies',
// 	async (page: number) => {
// 		const response = await fetch(
// 			`https://api.example.com/companies?page=${page}`
// 		)
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch companies')
// 		}
// 		const data = await response.json()
// 		return data
// 	}
// )

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
		addCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies.push(...action.payload)
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

			if (index !== -1) {
				state.companies[index] = {
					...state.companies[index],
					...action.payload,
				}
			}
		},
		sortCompanies: (state, action: PayloadAction<'name' | 'address'>) => {
			const sortBy = action.payload
			const sortDirection =
				state.sortBy === sortBy && state.sortDirection === 'asc'
					? 'desc'
					: 'asc'

			state.sortBy = sortBy
			state.sortDirection = sortDirection

			state.companies.sort((a, b) => {
				const fieldA = a[sortBy].toLowerCase()
				const fieldB = b[sortBy].toLowerCase()

				if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1
				if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1

				return 0
			})
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchCompanies.pending, (state) => {
	// 			state.loading = true
	// 		})
	// 		.addCase(fetchCompanies.fulfilled, (state, action) => {
	// 			state.companies = [...state.companies, ...action.payload]
	// 			state.loading = false
	// 		})
	// 		.addCase(fetchCompanies.rejected, (state) => {
	// 			state.loading = false
	// 		})
	// },
})

export const {
	addCompany,
	addCompanies,
	removeSelectedCompanies,
	toggleSelectCompany,
	toggleSelectAll,
	editCompany,
	sortCompanies,
} = companiesSlice.actions

export default companiesSlice.reducer
