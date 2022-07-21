import { compare, hash } from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 12);
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
