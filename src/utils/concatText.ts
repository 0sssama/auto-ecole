export const concatText = (text: string, maxLen: number = 10) => {
  if (text.length <= maxLen) return text;

  return text.slice(0, maxLen) + "...";
};

export const concatFileName = (text: string, maxLen: number = 10) => {
  if (text.length <= maxLen) return text;

  const ext = text.split(".").pop();

  return text.slice(0, maxLen) + "..." + ext;
};
