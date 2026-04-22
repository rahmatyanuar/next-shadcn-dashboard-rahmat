// src/lib/auth.ts
import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';
import { signInSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  providers: [
    // Filter semua provider yang BUKAN credentials
    ...authConfig.providers.filter((p) => typeof p === 'object' && p.id !== 'credentials'),

    // Tambahkan ulang Credentials dengan logika lengkap
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 1. Validasi input dengan Zod
        const validated = await signInSchema.safeParseAsync(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        // 2. Cari user di PostgreSQL via Prisma
        const user = await prisma.user.findUnique({ where: { email } });

        // 3. Cek apakah user ada dan punya password (user GitHub mungkin tidak punya password)
        if (!user || !(user as any).password) return null;

        // 4. Bandingkan password input dengan hash di DB
        const isMatch = await bcrypt.compare(password, (user as any).password);

        if (!isMatch) return null;

        // 5. Jika sukses, return data user untuk disimpan di JWT
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user as any).role
        };
      }
    })
  ]
});

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
  }
}
