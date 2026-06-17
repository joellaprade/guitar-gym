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
  const [metronomeVolume, setMetronomeVolume] = useState(1);

  const toggleMainBeat = () => {
    localStorage.setItem('isMainBeatActive', JSON.stringify(!isMainBeatActive));
    setIsMainBeatActive((prev) => !prev);
  };
  const handleMetronomeVolume = (volume: number) => {
    if (volume < 0 || volume > 200) return;
    localStorage.setItem('metronomeVolume', JSON.stringify(volume));
    setMetronomeVolume(volume);
  };
  const setLSValues = () => {
    setIsMainBeatActive(JSON.parse(localStorage.getItem('isMainBeatActive') ?? 'true'));
    setMetronomeVolume(JSON.parse(localStorage.getItem('metronomeVolume') ?? '1'));
  };

  useEffect(() => {
    if (data) router.push('/home');
  }, [data]);
  useEffect(setLSValues, []);

  return (
    <div className="vertical-container mx-8 mt-24 gap-12">
      <BackArrow link={'/home'} />
      <h1>Settings</h1>
      <div className="flex-center w-full flex-col gap-4">
        <h2 className="w-full text-start">Practice</h2>
        <h3 className="w-full text-start">Main Beat</h3>
        <button onClick={toggleMainBeat} className={`big main`}>
          {isMainBeatActive ? 'On' : 'Off'}
        </button>
        <h3 className="w-full text-start">Metronome Volume</h3>
        <input
          placeholder="Metronome Volume"
          className="w-full"
          type="number"
          value={metronomeVolume}
          onChange={(e) => handleMetronomeVolume(Number(e.target.value))}
        />
      </div>
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
    </div>
  );
};

export default Page;
