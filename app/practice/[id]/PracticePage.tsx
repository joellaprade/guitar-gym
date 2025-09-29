'use client';

import InfoBtn from '@/reusable/components/InfoBtn';
import Metronome from './(ui)/Metronome';
import PlaylistHeader from './(ui)/PlaylistHeader';
import { useEffect, useState } from 'react';
import { usePracticeContext } from '../PracticeContext';
import { ChevronLeft } from 'lucide-react';
import updateWorkout from '@/reusable/actions/practice/updateWorkout';
import { useRouter } from 'next/navigation';
import ToolTip from '@/reusable/components/ToolTip';
import { formatTime, formatWorkoutExercisesToDB } from '@/reusable/lib/clientUtils';

const Counter = () => {
  const { currentExercise, currentBeat, currentSecond, currentMeassure } = usePracticeContext();

  if (currentExercise.isTimeSelected) {
    return currentExercise.seconds && formatTime(currentExercise.seconds - currentSecond);
  } else {
    return (
      <>
        {currentBeat !== null ? currentMeassure + 1 : 0} / {currentExercise.measures}
      </>
    );
  }
};

const PracticePage = () => {
  const { workoutRef, currentExercise } = usePracticeContext();
  const [showContainer, setShowContainer] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const router = useRouter();

  const handleLeave = async () => {
    let dbFormattedWorkout = workoutRef.current as any;
    dbFormattedWorkout.exercises = formatWorkoutExercisesToDB(workoutRef.current.exercises);
    await updateWorkout(dbFormattedWorkout);
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
      <ChevronLeft onClick={handleLeave} className="absolute top-10 left-1 z-1 h-10 w-10 cursor-pointer text-white" />
      <h1 onClick={() => setShowToolTip((prev) => !prev)} className="relative mx-auto mt-24 inline w-fit">
        {currentExercise.title}
        <InfoBtn className="-right-[16px]" />
        <ToolTip showToolTip={showToolTip} text={currentExercise.description} video={currentExercise.video} />
      </h1>
      <h3 className="opacity-50">
        <Counter />
      </h3>
      <Metronome />
      <PlaylistHeader />
    </div>
  );
};

export default PracticePage;
