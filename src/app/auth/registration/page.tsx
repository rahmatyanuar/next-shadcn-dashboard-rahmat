// src/app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import { registerUser } from '@/lib/registration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await registerUser({ name, email, password });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      router.push('/auth/login');
    }
    setLoading(false);
  }

  return (
    <div className='flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 bg-neutral-900 rounded-lg border border-neutral-800'>
      <h1 className='text-2xl font-bold text-white'>Create Account</h1>
      <form action={handleSubmit} className='flex flex-col gap-3'>
        <input
          name='name'
          placeholder='Full Name'
          required
          className='p-2 rounded bg-neutral-800 text-white border border-neutral-700'
        />
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          className='p-2 rounded bg-neutral-800 text-white border border-neutral-700'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          className='p-2 rounded bg-neutral-800 text-white border border-neutral-700'
        />
        <button
          disabled={loading}
          className='bg-primary text-white p-2 rounded hover:opacity-90 disabled:bg-neutral-600'
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
