import MockPlayerProvider from '@/__mocks__/mockPlayerProvider';
import { mockRunemetricsProfileData } from '@/__mocks__/mockTestData';
import SearchBarForm from '@/app/components/searchBarForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchBarForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders gamemode select combobox', () => {
    render(
      <MockPlayerProvider>
        <SearchBarForm />
      </MockPlayerProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('displays success status on success', async () => {
    const user = userEvent.setup();

    render(
      <MockPlayerProvider message='Player data updated successfully.'>
        <SearchBarForm />
      </MockPlayerProvider>
    );

    const input = await screen.findByTestId('form-input-username');
    await user.type(input, 'testUser');

    const submitButton = await screen.findByTestId('form-submit-btn');
    await user.click(submitButton);

    await waitFor(async () => {
      const statusMessage = await screen.findByTestId('status-message');
      expect(statusMessage).toBeInTheDocument();
      expect(statusMessage).toHaveTextContent(
        'Player data updated successfully.'
      );
    });
  });

  it('displays error status on error', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockRunemetricsProfileData,
    });

    const user = userEvent.setup();

    render(
      <MockPlayerProvider message='Runescape api unavailable, please try again later.'>
        <SearchBarForm />
      </MockPlayerProvider>
    );

    const input = await screen.findByTestId('form-input-username');
    await user.type(input, 'testUser');

    const submitButton = await screen.findByTestId('form-submit-btn');
    await user.click(submitButton);

    await waitFor(async () => {
      const statusMessage = await screen.findByTestId('status-message');
      expect(statusMessage).toBeInTheDocument();
      expect(statusMessage).toHaveTextContent(
        'Runescape api unavailable, please try again later.'
      );
    });
  });

  it('handles fetch abort correctly', async () => {
    const abortError = new Error('The user aborted a request.');
    abortError.name = 'AbortError';

    mockedAxios.get.mockRejectedValue(abortError);

    const user = userEvent.setup();

    render(
      <MockPlayerProvider message='Fetch aborted'>
        <SearchBarForm />
      </MockPlayerProvider>
    );

    const input = await screen.findByTestId('form-input-username');
    await user.type(input, 'testUser');

    const submitButton = await screen.findByTestId('form-submit-btn');
    await user.click(submitButton);

    await waitFor(async () => {
      const statusMessage = await screen.findByTestId('status-message');
      expect(statusMessage).toBeInTheDocument();
      expect(statusMessage).toHaveTextContent('Fetch aborted');
    });
  });
});
