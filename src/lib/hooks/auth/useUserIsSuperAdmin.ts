import { api } from "@/utils/api";

export const useUserIsSuperAdmin = () => {
  const { data, isLoading } = api.db.admins.query.isSuperAdmin.useQuery();

  return {
    isSuperAdmin: data ?? false,
    isLoaded: !isLoading,
  };
};
