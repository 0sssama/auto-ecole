import { createTRPCRouter } from '@/server/api/trpc';

import { queryRouter } from './query';
import { mutationRouter } from './mutation';

export const vehiclesRouter = createTRPCRouter({
  query: queryRouter,
  mutation: mutationRouter,
});
