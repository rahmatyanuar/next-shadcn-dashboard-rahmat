import { signOut } from '@/../src/lib/auth';

const LogoutPage = async () => {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center p-4'>
      <div className='bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-sm w-full text-center'>
        <h1 className='text-white text-2xl font-bold mb-2'>Sign Out</h1>
        <p className='text-gray-400 mb-8'>Are you sure you want to log out from your account?</p>

        {/* Menggunakan Form Action untuk keamanan Server-Side */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/auth/login' });
          }}
          className='space-y-3'
        >
          <button
            type='submit'
            className='w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
          >
            Yes, Log me out
          </button>

          <a
            href='/dashboard/overview'
            className='block w-full bg-neutral-800 hover:bg-neutral-700 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors'
          >
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
};

export default LogoutPage;
