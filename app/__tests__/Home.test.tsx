import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />) // Arrange

		const heading = screen.getByRole('heading', { level: 1 }) // Act

		expect(heading).toBeInTheDocument() // Assert
	})
})
