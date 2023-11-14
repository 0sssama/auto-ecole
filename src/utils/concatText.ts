export const concatText = (text: string, maxLen: number = 10) => {
  if (text.length <= maxLen) return text;

  return text.slice(0, maxLen) + "...";
};
