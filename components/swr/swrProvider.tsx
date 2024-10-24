import axios from 'axios';
import { SWRConfig } from 'swr';

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
export default SWRProvider;
