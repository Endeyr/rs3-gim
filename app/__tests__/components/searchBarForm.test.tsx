import SearchBarForm from '@/app/components/searchBarForm'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	const mockSetPlayerData = jest.fn()
	const mockSetUsername = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders search bar', () => {
		render(
			<SearchBarForm
				setPlayerData={mockSetPlayerData}
				setUsername={mockSetUsername}
			/>
		)

		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})
})
