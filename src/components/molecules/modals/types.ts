import type { FC } from 'react';

export type ModalOwnProps<TContext = undefined> = {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close: () => any;
} & (TContext extends undefined
  ? {
      // empty object
    }
  : { context: TContext });

export type ModalComponentType<TContext = undefined> = FC<ModalOwnProps<TContext>>;
