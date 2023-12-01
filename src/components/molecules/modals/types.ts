import type { FC } from "react";

export type ModalOwnProps<TContext = undefined> = {
  isOpen: boolean;
  close: () => any;
} & (TContext extends undefined ? {} : { context: TContext });

export type ModalComponentType<TContext = undefined> = FC<
  ModalOwnProps<TContext>
>;
