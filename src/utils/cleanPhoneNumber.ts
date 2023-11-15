export const cleanPhoneNumber = (phone: string): string =>
  phone
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("+", "")
    .replaceAll(".", "")
    .replaceAll("x", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
