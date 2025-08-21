'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePracticeContext } from '../../PracticeContext';
import { useEffect, useRef, useState } from 'react';
import { useMetronomeContext } from '../../MetronomeContext';
import { Gradient } from '@/reusable/components/Gradient';

const Metronome = () => {
  const { currentExercise, currentBeat } = usePracticeContext();
  const { color, isPlaying, toggleMetronome, changeExercise, changeTempo } = useMetronomeContext();
  const [pulse, setPulse] = useState(true);

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const fireInterval = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') changeExercise('prev');
    else if (e.key === 'ArrowRight') changeExercise('next');
    else if (e.key === 'ArrowUp') changeTempo(1);
    else if (e.key === 'ArrowDown') changeTempo(-1);
    else if (e.key === ' ') toggleMetronome();
  };
  const getSignatureBeat = () => {
    if (currentBeat === null) return;
    return currentBeat % currentExercise.timeSignature[0];
  };
  const handleHoldChangeTempo = (direction: 1 | -1) => {
    holdTimeout.current = setTimeout(() => {
      fireInterval.current = setInterval(() => {
        changeTempo(direction);
      }, 25);
    }, 500);
  };
  const handleReleaseChangeTempo = (direction: 1 | -1) => {
    if (fireInterval.current) {
      clearInterval(fireInterval.current);
      fireInterval.current = null;
    } else {
      if (holdTimeout.current) {
        clearTimeout(holdTimeout.current);
        fireInterval.current = null;
      }
      changeTempo(direction);
    }
    changeTempo(1);
    changeTempo(-1);
  };

  useEffect(() => {
    const delay = 60000 / currentExercise.bpm - 100;
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, delay);
  }, [currentBeat]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentExercise, isPlaying]);

  return (
    <div className="metronome">
      <div className="counter flex gap-2.5">
        {Array.from({ length: currentExercise.timeSignature[0] }).map((_, index) => (
          <div
            key={index}
            className={`outline-3 outline-[#ffffff80] w-1.5 h-1.5 rounded-full ${index == getSignatureBeat() && 'bg-[#ffffff80] '}`}
          ></div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <ChevronLeft
          className="stroke-white stroke-2 h-15 w-15 touch-none"
          onPointerDown={() => handleHoldChangeTempo(-1)}
          onPointerUp={() => handleReleaseChangeTempo(-1)}
        />
        <div
          onClick={toggleMetronome}
          className={`play-btn relative transition-colors duration-1000 `}
          style={{ backgroundColor: color }}
        >
          {isPlaying ? (
            <div className="flex flex-col items-center justify-center relative z-2">
              <h1 className="text-dark-gray text-7xl font-bold">{currentExercise.bpm}</h1>
              <h3 className="text-dark-gray font-bold absolute bottom-0 translate-y-[65%]">bpm</h3>
            </div>
          ) : (
            <PlayBtn className="w-[35%] h-[35%] relative left-1.5 fill-dark-gray z-2" />
          )}
          <Gradient />
          <div
            className={`pulse-effect`}
            style={{ animation: pulse ? `pulse ${60 / currentExercise.bpm}s ease-out` : '' }}
          ></div>
        </div>
        <ChevronRight
          className="stroke-white stroke-2 h-15 w-15 touch-none"
          onPointerDown={() => handleHoldChangeTempo(1)}
          onPointerUp={() => handleReleaseChangeTempo(1)}
        />
      </div>
    </div>
  );
};

export default Metronome;
