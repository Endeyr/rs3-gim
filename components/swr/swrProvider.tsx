import fetch from 'node-fetch';
import { SWRConfig } from 'swr';

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
export default SWRProvider;
