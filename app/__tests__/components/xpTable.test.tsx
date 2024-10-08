import XpTable from '@/app/components/xpTable'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders search bar', () => {
		render(<XpTable />)

		expect(screen.getByRole('table')).toBeInTheDocument()
	})
})
