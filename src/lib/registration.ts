// src/actions/register.ts
'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { registerSchema } from './zod';
import z from 'zod';

export const registerUser = async (values: z.infer<typeof registerSchema>) => {
  // 1. Validasi input
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid!' };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // 2. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: 'Email sudah digunakan!' };
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan ke Database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return { success: 'User berhasil dibuat! Silakan login.' };
  } catch (error) {
    return { error: 'Terjadi kesalahan pada server.' };
  }
};
