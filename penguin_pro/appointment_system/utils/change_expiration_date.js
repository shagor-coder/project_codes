export const change_expiration_date = (expires_in) => {
  const current_date = new Date();
  const expiration_date = new Date(current_date.getTime() + expires_in * 1000);
  return expiration_date;
};
