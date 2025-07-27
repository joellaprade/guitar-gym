'use client';

import logOut from '@/reusable/actions/logOut';
import BackArrow from '@/reusable/components/BackArrow';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const { data, loading, runAction } = useFetchServerAction(logOut);

  useEffect(() => {
    if (data) router.push('/home');
  }, [data]);

  return (
    <div className="vertical-container gap-12 mt-24">
      <BackArrow link={'/home'} />
      <h1>Settings</h1>
      <div className="flex-center flex-col gap-4 w-full">
        <h2 className="text-start w-full">Session</h2>
        <button
          onClick={() => {
            runAction();
          }}
          className={`big main ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </div>
  );
};

export default Page;
