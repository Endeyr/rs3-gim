import XpTable from '@/app/components/xpTable'
import { mockParsedPlayerData } from '@/lib/testData'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders search bar', () => {
		render(<XpTable playerData={mockParsedPlayerData} username="LightsOutIV" />)

		expect(screen.getByRole('table')).toBeInTheDocument()
	})
})
