import type { UseTRPCMutationOptions } from '@trpc/react-query/shared';

export type TranslationFunction = (key: string) => typeof key;

export type TRPCOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: UseTRPCMutationOptions<any, any, any>['onSuccess'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: UseTRPCMutationOptions<any, any, any>['onError'];
};
