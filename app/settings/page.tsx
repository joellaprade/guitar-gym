'use client';

import logOut from '@/reusable/actions/logOut';
import BackArrow from '@/reusable/components/BackArrow';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const { data, loading, runAction } = useFetchServerAction(logOut);
  const [isMainBeatActive, setIsMainBeatActive] = useState<boolean>(true);

  const toggleMainBeat = () => {
    localStorage.setItem('isMainBeatActive', JSON.stringify(!isMainBeatActive));
    setIsMainBeatActive((prev) => !prev);
  };

  useEffect(() => {
    if (data) router.push('/home');
  }, [data]);
  useEffect(() => {
    setIsMainBeatActive(JSON.parse(localStorage.getItem('isMainBeatActive') ?? 'true'));
  }, []);

  return (
    <div className="vertical-container mx-8 mt-24 gap-12">
      <BackArrow link={'/home'} />
      <h1>Settings</h1>
      <div className="flex-center w-full flex-col gap-4">
        <h2 className="w-full text-start">Session</h2>
        <button
          onClick={() => {
            runAction();
          }}
          className={`big main ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </div>
      <div className="flex-center w-full flex-col gap-4">
        <h2 className="w-full text-start">Practice</h2>
        <button onClick={toggleMainBeat} className={`big main ${loading ? 'opacity-50' : ''}`}>
          {isMainBeatActive ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
};

export default Page;
