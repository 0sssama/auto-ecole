import { api } from '@/utils/api';

export const useUserIsAdmin = () => {
  const { data, isLoading } = api.db.admins.query.isAdmin.useQuery();

  return {
    isAdmin: data ?? false,
    isLoaded: !isLoading,
  };
};
