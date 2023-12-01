export const isMobilePhone = (phone: string): boolean => {
  if (phone.length !== 10) return false;

  return /^0[567]\d{8}$/.test(phone);
};
