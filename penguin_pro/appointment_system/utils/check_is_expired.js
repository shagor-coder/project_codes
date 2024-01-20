export const is_token_expired = (expiration_date) => {
  const current_date = new Date();
  const expiration_date_obj = new Date(expiration_date);
  return expiration_date_obj < current_date;
};
