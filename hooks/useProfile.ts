import { PlayerDataI } from '@/types/playerData';
import useSWR from 'swr';

interface useProfileI {
  name: string;
}

const useProfile = ({ name }: useProfileI) => {
  const url = `/api/runemetrics/getProfile?name=${encodeURIComponent(name)}`;
  const { data, error, isValidating } = useSWR<PlayerDataI>(url);

  return {
    profileData: data,
    isValidatingProfileData: isValidating,
    isProfileDataError: error,
  };
};

export default useProfile;
