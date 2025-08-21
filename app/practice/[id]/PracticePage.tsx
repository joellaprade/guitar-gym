'use client';

import InfoBtn from '@/reusable/components/InfoBtn';
import Metronome from './(ui)/Metronome';
import Playlist from './(ui)/Playlist';
import { useEffect, useState } from 'react';
import { usePracticeContext } from '../PracticeContext';
import { ChevronLeft } from 'lucide-react';
import saveWorkout from '@/reusable/actions/practice/saveWorkout';
import { useRouter } from 'next/navigation';

const PracticePage = () => {
  const { workoutRef, currentExercise, currentBeat, currentMeassure } = usePracticeContext();
  const [showContainer, setShowContainer] = useState(false);
  const router = useRouter();

  const handleLeave = async () => {
    await saveWorkout(workoutRef.current);
    router.push('/practice');
  };

  useEffect(() => {
    setShowContainer(true);
  }, []);

  return (
    <div
      className={`vertical-container transition-opacity duration-700 ${showContainer ? 'opacity-100' : 'opacity-0'}`}
    >
      <ChevronLeft
        onClick={handleLeave}
        className=" text-white w-10 h-10 cursor-pointer z-1 absolute top-10 left-1"
      />
      <h1 className="relative mt-24 w-fit inline mx-auto">
        {currentExercise.title} <InfoBtn className="-right-[16px]" />
      </h1>
      <h3 className="opacity-50">
        {currentBeat !== null ? currentMeassure + 1 : 0} / {currentExercise.measures}
      </h3>
      <Metronome />
      <Playlist />
    </div>
  );
};

export default PracticePage;
