export const createExpireDate = (expires_in: number) => {
  const current_date = new Date();
  const expiration_date = new Date(current_date.getTime() + expires_in * 1000);
  return expiration_date;
};

export const checkExpiresDate = (expires_in: string) => {
  const inputDate = new Date(expires_in);

  const currentDate = new Date();
  return inputDate < currentDate;
};
