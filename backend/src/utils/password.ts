import * as bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds =
    (process.env.SALT_ROUNDS && parseInt(process.env.SALT_ROUNDS)) || 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
