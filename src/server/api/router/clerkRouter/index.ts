import { createTRPCRouter } from '@/server/api/trpc';

import { usersRouter } from './users';

export const clerkRouter = createTRPCRouter({
  users: usersRouter,
});
