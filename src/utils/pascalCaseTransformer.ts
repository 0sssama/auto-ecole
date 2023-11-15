export const pascalCaseTransformer = (input: string): string =>
  input.toLowerCase().replaceAll(" ", "_");
