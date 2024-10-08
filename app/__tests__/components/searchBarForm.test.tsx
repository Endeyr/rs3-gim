import MockPlayerProvider from '@/__mocks__/mockPlayerProvider'
import SearchBarForm from '@/app/components/searchBarForm'
import { render, screen } from '@testing-library/react'

describe('SearchBarForm', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders gamemode select combobox', () => {
		render(
			<MockPlayerProvider>
				<SearchBarForm />
			</MockPlayerProvider>
		)

		expect(screen.getByRole('combobox')).toBeInTheDocument()
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
	})
})
