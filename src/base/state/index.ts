import { atom } from 'recoil';

export const menuOpenState = atom({
  key: 'menuOpenState',
  default: false,
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
