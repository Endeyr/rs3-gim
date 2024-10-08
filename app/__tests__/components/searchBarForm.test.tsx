import SearchBarForm from '@/app/components/searchBarForm'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders search bar', () => {
		render(<SearchBarForm />)

		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})
})
