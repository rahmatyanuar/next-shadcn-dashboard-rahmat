import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password: string) => {
  // Angka 10 adalah 'salt rounds' - standar keamanan yang baik
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password: string, hash: string) => {
  // Membandingkan password input dengan hash dari database (PostgreSQL)
  return await bcrypt.compare(password, hash);
};
