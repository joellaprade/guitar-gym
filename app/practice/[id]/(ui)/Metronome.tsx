'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePracticeContext } from '../../PracticeContext';
import { useEffect, useState } from 'react';
import { useMetronomeContext } from '../../MetronomeContext';

const Gradient = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="476"
      height="476"
      viewBox="0 0 476 476"
      fill="none"
      className="absolute w-full z-1 h-fit"
    >
      <circle
        cx="238"
        cy="238"
        r="237"
        transform="rotate(-75 238 238)"
        fill="url(#paint0_radial_2135_113)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2135_113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(363.176 36.7442) rotate(121.881) scale(237.008 578.634)"
        >
          <stop stopColor="white" stopOpacity="0.7" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const Metronome = () => {
  const { currentExercise, currentBeat } = usePracticeContext();
  const { color, isPlaying, toggleMetronome, changeExercise, changeTempo } = useMetronomeContext();
  const [pulse, setPulse] = useState(true);

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

  useEffect(() => {
    const delay = 60000 / currentExercise.bpm - 100;
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, delay);
  }, [currentBeat]);

  useEffect(() => console.log(pulse), [pulse]);

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
          className="stroke-white stroke-2 h-15 w-15"
          onClick={() => changeExercise('prev')}
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
          className="stroke-white stroke-2 h-15 w-15"
          onClick={() => changeExercise('next')}
        />
      </div>
    </div>
  );
};

export default Metronome;

//corregir duracion de pulse

/*

'use client';

import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePracticeContext } from '../../PracticeContext';
import { useEffect, useState } from 'react';
import { useMetronomeContext } from '../../MetronomeContext';

const Gradient = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="476"
      height="476"
      viewBox="0 0 476 476"
      fill="none"
      className="absolute w-full z-1 h-fit"
    >
      <circle
        cx="238"
        cy="238"
        r="237"
        transform="rotate(-75 238 238)"
        fill="url(#paint0_radial_2135_113)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2135_113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(363.176 36.7442) rotate(121.881) scale(237.008 578.634)"
        >
          <stop stopColor="white" stopOpacity="0.7" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const Metronome = () => {
  const { currentExercise, currentBeat } = usePracticeContext();
  const { color, isPlaying, toggleMetronome, changeExercise, changeTempo } = useMetronomeContext();
  const [pulse, setPulse] = useState(false);

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

  useEffect(() => {
    setPulse(true);

    setTimeout(
      () => {
        setPulse(false);
      },
      60000 / currentExercise.bpm - 50
    );
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
          className="stroke-white stroke-2 h-15 w-15"
          onClick={() => changeExercise('prev')}
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
            className={`pulse-effect ${pulse ? 'pulse-animation' : ''}`}
            style={
              {
                '--pulse-duration': `${60 / currentExercise.bpm}s`,
                '--pulse-animation': `pulse var(--pulse-duration)s ease-out`,
              } as React.CSSProperties
            }
          ></div>
        </div>
        <ChevronRight
          className="stroke-white stroke-2 h-15 w-15"
          onClick={() => changeExercise('next')}
        />
      </div>
    </div>
  );
};

export default Metronome;

//corregir duracion de pulse


*/
