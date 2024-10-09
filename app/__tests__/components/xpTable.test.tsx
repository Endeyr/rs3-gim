import MockPlayerProvider from '@/__mocks__/mockPlayerProvider'
import { mockParsedPlayerData } from '@/__mocks__/mockTestData'
import XpTable from '@/app/components/xpTable'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders the table when player data is provided', () => {
		render(
			<MockPlayerProvider>
				<XpTable playerData={mockParsedPlayerData} />
			</MockPlayerProvider>
		)

		expect(screen.getByRole('table')).toBeInTheDocument()
		expect(screen.getByText(/attack/i)).toBeInTheDocument()
	})
})
