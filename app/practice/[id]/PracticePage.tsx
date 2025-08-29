'use client';

import InfoBtn from '@/reusable/components/InfoBtn';
import Metronome from './(ui)/Metronome';
import Playlist from './(ui)/Playlist';
import { useEffect, useState } from 'react';
import { usePracticeContext } from '../PracticeContext';
import { ChevronLeft } from 'lucide-react';
import updateWorkout from '@/reusable/actions/practice/updateWorkout';
import { useRouter } from 'next/navigation';
import ToolTip from '@/reusable/components/ToolTip';
import { formatWorkoutExercisesToDB } from '@/reusable/lib/clientUtils';

const PracticePage = () => {
  const { workoutRef, currentExercise, currentBeat, currentMeassure } = usePracticeContext();
  const [showContainer, setShowContainer] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const router = useRouter();

  const handleLeave = async () => {
    let dbFormattedWorkout = workoutRef.current as any;
    dbFormattedWorkout.exercises = formatWorkoutExercisesToDB(workoutRef.current.exercises);
    updateWorkout(dbFormattedWorkout);
    router.push('/practice');
  };

  useEffect(() => {
    setShowContainer(true);
  }, []);
  useEffect(() => {
    if (!showToolTip) return;

    const handleClick = () => setShowToolTip(false);

    document.addEventListener('click', handleClick, { once: true });

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showToolTip]);

  return (
    <div className={`vertical-container transition-opacity duration-700 ${showContainer ? 'opacity-100' : 'opacity-0'}`}>
      <ChevronLeft onClick={handleLeave} className=" text-white w-10 h-10 cursor-pointer z-1 absolute top-10 left-1" />
      <h1 onClick={() => setShowToolTip((prev) => !prev)} className="relative mt-24 w-fit inline mx-auto">
        {currentExercise.title}
        <InfoBtn className="-right-[16px]" />
        {showToolTip && <ToolTip text={currentExercise.description} />}
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
