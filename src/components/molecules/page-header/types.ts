import type { TranslationFunction } from "@/types";
import type { FC } from "react";

interface PageHeaderProps {
  openModal: () => void;
  t: TranslationFunction;
}

export type PageHeaderComponentType = FC<PageHeaderProps>;
