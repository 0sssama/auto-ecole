export const joinedInLastWeek = (date: Date): boolean => {
  const weekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  return date.getTime() > weekAgo;
};
