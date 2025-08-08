'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePracticeContext } from '../../PracticeContext';
import { useEffect, useRef } from 'react';

const Metronome = () => {
  const {
    currentExercise,
    currentExerciseIndex,
    currentBeat,
    workout,
    setCurrentExercise,
    setCurrentExerciseIndex,
  } = usePracticeContext();
  const interval = useRef<NodeJS.Timeout | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  const runBeat = () => {
    clickSound.current!.play();
  };

  const playPauseMetronome = () => {
    if (interval.current) {
      clearInterval(interval.current!);
      interval.current = null;
      return;
    }
    runBeat();
    const time = 60000 / currentExercise.bpm;
    interval.current = setInterval(runBeat, time);
  };

  const changeExercise = (direction: 'next' | 'prev') => {
    const totalExercises = workout.exercises.length;
    const i = direction === 'next' ? currentExerciseIndex + 1 : currentExerciseIndex - 1;
    if (i < 0 || i >= totalExercises) return;
    if (direction === 'next') {
      setCurrentExercise(workout.exercises[i]);
      setCurrentExerciseIndex(i);
    } else {
      setCurrentExercise(workout.exercises[i]);
      setCurrentExerciseIndex(i);
    }
  };

  useEffect(() => {
    clickSound.current = new Audio('/sound/bigClick.wav');
    clickSound.current.load();
  }, []);

  return (
    <div className="metronome">
      <div className="counter flex gap-2.5">
        {Array.from({ length: currentExercise.timeSignature[0] }).map((_, index) => (
          <div
            key={index}
            className={`outline-3 outline-[#ffffff80] w-1.5 h-1.5 rounded-full ${index == currentBeat && 'bg-blue-300 '}`}
          ></div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <ChevronLeft
          onClick={() => changeExercise('prev')}
          className="stroke-white stroke-2 h-15 w-15"
        />
        <div onClick={playPauseMetronome} className="play-btn">
          <PlayBtn className="w-[35%] h-[35%] relative left-1.5 fill-dark-gray" />
        </div>
        <ChevronRight
          onClick={() => changeExercise('next')}
          className="stroke-white stroke-2 h-15 w-15"
        />
      </div>
    </div>
  );
};

export default Metronome;
