import MockPlayerProvider from '@/__mocks__/mockPlayerProvider'
import XpTable from '@/app/components/xpTable'
import { render, screen } from '@testing-library/react'

describe('SearchBar', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders the table when player data is provided', () => {
		render(
			<MockPlayerProvider>
				<XpTable />
			</MockPlayerProvider>
		)

		expect(screen.getByRole('table')).toBeInTheDocument()
		expect(screen.getByText(/attack/i)).toBeInTheDocument()
	})

	it('renders no table when playerData is null', () => {
		render(
			<MockPlayerProvider playerData={null}>
				<XpTable />
			</MockPlayerProvider>
		)

		expect(screen.queryByRole('table')).not.toBeInTheDocument()
	})
})
