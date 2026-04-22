import { SignIn } from '../components/auth-components';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  // 1. Jika session DITEMUKAN, lempar ke dashboard
  if (session) {
    redirect('/dashboard/overview');
  }

  // 2. Jika session TIDAK DITEMUKAN
  // Jika ini adalah halaman "/" atau "/auth/login", biarkan dia merender form login.
  // Tapi jika ini adalah halaman dashboard, maka tambahkan:
  if (!session) {
    redirect('/auth/login'); // Aktifkan ini HANYA jika file ini berada di rute /dashboard
  }
};

export default Page;
