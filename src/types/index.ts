import { UseTRPCMutationOptions } from "@trpc/react-query/dist/shared";

export type TranslationFunction = (key: string) => typeof key;

export type TRPCOptions = {
  onSuccess?: UseTRPCMutationOptions<any, any, any>["onSuccess"];
  onError?: UseTRPCMutationOptions<any, any, any>["onError"];
};
