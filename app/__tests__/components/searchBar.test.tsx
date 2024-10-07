import SearchBar from '@/app/components/searchBar'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders search bar', () => {
		render(<SearchBar />)

		expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
	})
})
