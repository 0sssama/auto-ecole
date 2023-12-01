"use client";

import { useState } from "react";

export const useModal = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue || false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
};
