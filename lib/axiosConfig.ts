import axios from 'axios';
import axiosRetry from 'axios-retry';

interface RetryConfig {
  retries: number;
  timeout: number;
  shouldRetry?: (error: unknown) => boolean;
}

export const configureAxiosWithRetry = ({
  retries = 3,
  timeout = 60000,
  shouldRetry,
}: RetryConfig) => {
  axiosRetry(axios, {
    retries,
    retryDelay: (retryCount) => {
      return axiosRetry.exponentialDelay(retryCount);
    },
    retryCondition: (error) => {
      if (shouldRetry) {
        return shouldRetry(error);
      }

      if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
        return false;
      }

      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status ?? 0) >= 500
      );
    },
    onRetry: (retryCount, _, requestConfig) => {
      console.warn(
        `Retrying request to ${requestConfig.url} (attempt ${retryCount})`
      );
    },
  });

  axios.defaults.timeout = timeout;
};
