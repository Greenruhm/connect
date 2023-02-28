export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';
export const isValidEmail = (email = '') =>
  Boolean(String(email).toLowerCase().match(EMAIL_PATTERN));
