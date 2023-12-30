import { api } from '@/base/utils/server/api';

export const useUserIsSuperAdmin = () => {
  const { data, isLoading } = api.db.admins.query.isSuperAdmin.useQuery(undefined, {
    refetchInterval: false,
  });

  return {
    isSuperAdmin: data ?? false,
    isLoaded: !isLoading,
  };
};
