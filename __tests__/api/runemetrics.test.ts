import axios from 'axios';
import {
  mockRunemetricsMonthlyXpData,
  mockRunemetricsProfileData,
  mockRunemetricsQuestsData,
} from './../../__mocks__/mockTestData';
import {
  getMonthlyXpData,
  getProfileData,
  getQuestData,
} from './../../lib/api/runemetrics';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('runemetrics api calls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfileData', () => {
    it('gets profile by name successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockRunemetricsProfileData,
      });

      const player = await getProfileData('testPlayer');

      expect(player).toEqual({
        ...mockRunemetricsProfileData,
        timestamp: expect.any(Date),
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('testPlayer'),
        expect.objectContaining({ timeout: 10000 })
      );
    });
  });

  describe('getMonthlyXpData', () => {
    it('gets monthly xp by name and skill id successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockRunemetricsMonthlyXpData,
      });

      const player = await getMonthlyXpData('testPlayer', 0);

      expect(player).toEqual({
        ...mockRunemetricsMonthlyXpData,
        monthlyXpGain: mockRunemetricsMonthlyXpData.monthlyXpGain.map(
          (xpGain) => ({
            ...xpGain,
            timestamp: expect.any(Date),
          })
        ),
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('testPlayer'),
        expect.objectContaining({ timeout: 10000 })
      );
    });
  });

  describe('getQuestData', () => {
    it('gets quest data by name successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockRunemetricsQuestsData,
      });

      const player = await getQuestData('testPlayer');

      expect(player).toEqual({
        ...mockRunemetricsQuestsData,
        timestamp: expect.any(Date),
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('testPlayer'),
        expect.objectContaining({ timeout: 10000 })
      );
    });
  });
});
