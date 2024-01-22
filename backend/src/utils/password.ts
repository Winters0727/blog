import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 3753;

export const hashPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
