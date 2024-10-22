import MockPlayerProvider from '@/__mocks__/mockPlayerProvider';
import SearchBar from '@/app/components/searchBar';
import { render, screen } from '@testing-library/react';

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders username input and search button', () => {
    render(
      <MockPlayerProvider>
        <SearchBar />
      </MockPlayerProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('initially disables the search button if loading', () => {
    // Update MockPlayerProvider to pass isLoading: true
    render(
      <MockPlayerProvider isLoading={true}>
        <SearchBar />
      </MockPlayerProvider>
    );

    expect(screen.getByRole('button', { name: /Loading.../i })).toBeDisabled();
  });
});
