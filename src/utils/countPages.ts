export const countPages = (totalArticles: number, pageSize: number): number =>
  Math.ceil(totalArticles / pageSize);
