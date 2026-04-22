import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  // 1. Jika session DITEMUKAN, lempar ke dashboard
  if (session) {
    redirect('/dashboard/overview');
  } else {
    redirect('/api/auth/signin');
  }
};

export default Page;
