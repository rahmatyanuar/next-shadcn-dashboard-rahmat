// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export default {
  providers: [
    GitHub({
      authorization: {
        params: {
          scope: 'read:user user:email repo' // Menambah izin akses repo
        }
      }
    }),
    Credentials({
      // Kita biarkan kosong di sini, logika aslinya ada di auth.ts
      authorize: async (credentials) => {
        return null;
      }
    })
  ]
} satisfies NextAuthConfig;
