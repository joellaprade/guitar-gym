'use client';

import BackArrow from '@/reusable/components/BackArrow';
import InfoBtn from '@/reusable/components/InfoBtn';
import Metronome from './(ui)/Metronome';
import Playlist from './(ui)/Playlist';
import { useEffect, useState } from 'react';
import { usePracticeContext } from '../PracticeContext';

const PracticePage = () => {
  const { currentExercise, currentBeat } = usePracticeContext();
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    setShowContainer(true);
  }, []);

  return (
    <div
      className={`vertical-container transition-opacity duration-700 ${showContainer ? 'opacity-100' : 'opacity-0'}`}
    >
      <BackArrow link={'/practice'} />
      <h1 className="relative mt-24 w-fit inline mx-auto">
        {currentExercise.title} <InfoBtn className="-right-[16px]" />
      </h1>
      <h3 className="opacity-50">
        {currentBeat} / {currentExercise.measures}
      </h3>
      <Metronome />
      <Playlist />
    </div>
  );
};

export default PracticePage;
