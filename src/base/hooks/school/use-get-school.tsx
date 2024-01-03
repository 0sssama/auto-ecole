import { api } from '@/base/utils/server/api';

export const useGetSchool = () => {
  const { data, error, isLoading } = api.db.school.query.get.useQuery();

  return {
    schoolData: data,
    isLoading,
    error,
  };
};
