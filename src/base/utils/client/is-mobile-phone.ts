export const isMobilePhone = (phone: string): boolean => {
  if (phone.length !== 10) return false;

  return /^0[5-7]\d{8}$/.test(phone);
};
