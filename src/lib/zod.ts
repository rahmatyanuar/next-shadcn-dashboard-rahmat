import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' }) // Berfungsi sebagai 'required'
    .email({ message: 'Invalid email' }),

  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be more than 8 characters' })
    .max(32, { message: 'Password must be less than 32 characters' })
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter')
});
