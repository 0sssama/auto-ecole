import type { FC } from 'react';

type ModalOwnProps<TContext = undefined> = {
  isOpen: boolean;
  close: () => void;
} & (TContext extends undefined
  ? {
      // empty object
    }
  : { context: TContext });

export type ModalComponentType<TContext = undefined> = FC<ModalOwnProps<TContext>>;
