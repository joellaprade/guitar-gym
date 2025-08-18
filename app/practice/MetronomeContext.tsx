'use client';

import { createContext, useContext, useRef, useState } from 'react';
import { usePracticeContext } from './PracticeContext';
import { MetronomeSound } from './MetronomeSound';

type ContextType = {
  isPlaying: boolean;
  changeExercise: (direction: 'next' | 'prev') => void;
  changeTempo: (count: 1 | -1) => void;
  toggleMetronome: () => void;
};

const MetronomeContext = createContext<ContextType | undefined>(undefined);

export const useMetronomeContext = () => {
  const context = useContext(MetronomeContext);
  if (!context) throw new Error('useMetronomeContext must be used within a MetronomeProvider');
  return context;
};

export const MetronomeProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    workout,
    currentExercise,
    currentExerciseIndex,
    setCurrentExercise,
    setCurrentExerciseIndex,
    setCurrentBeat,
  } = usePracticeContext();

  const metronomeRef = useRef<MetronomeSound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMetronome = () => {
    if (!metronomeRef.current) {
      metronomeRef.current = new MetronomeSound(
        currentExercise.bpm,
        '/sound/smallClick.wav',
        runBeat
      );
      metronomeRef.current.start();
    } else {
      metronomeRef.current.stop();
      metronomeRef.current = null;
    }

    setIsPlaying((prev) => !prev);
  };
  const runBeat = () => {
    setCurrentBeat((prev) => (prev === null ? 0 : prev + 1));
  };
  const changeExercise = (direction: 'next' | 'prev') => {
    const totalExercises = workout.exercises.length;
    const i = direction === 'next' ? currentExerciseIndex + 1 : currentExerciseIndex - 1;

    if (i < 0 || i >= totalExercises) return;

    setCurrentExercise(workout.exercises[i]);
    setCurrentExerciseIndex(i);
    setCurrentBeat(null);

    if (metronomeClick) playPauseMetronome();
  };
  const changeTempo = (count: 1 | -1) => {
    setCurrentExercise((prev) => ({ ...prev, bpm: prev.bpm + count }));
    if (metronomeClick) {
      clearInterval(metronomeClick!);
      const time = 60000 / currentExercise.bpm;
      setMetronomeClick(setInterval(runBeat, time));
    }
  };

  return (
    <MetronomeContext.Provider
      value={{
        isPlaying,
        changeExercise,
        toggleMetronome,
        changeTempo,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};
