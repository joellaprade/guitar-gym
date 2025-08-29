'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePracticeContext } from './PracticeContext';
import { MetronomeSound } from './MetronomeSound';

type ContextType = {
  color: string;
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
    workoutRef,
    currentMeassure,
    currentExercise,
    currentExerciseIndex,
    setCurrentBeat,
    setCurrentExercise,
    setCurrentMeasure,
    setCurrentExerciseIndex,
  } = usePracticeContext();

  const metronomeRef = useRef<MetronomeSound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [color, setColor] = useState('#FFFFFF');

  const toggleMetronome = () => {
    if (!metronomeRef.current) {
      metronomeRef.current = new MetronomeSound(currentExercise.bpm, currentExercise.timeSignature[0], runBeat);
      metronomeRef.current.start();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        metronomeRef.current.stop();
        setIsPlaying(false);
      } else {
        metronomeRef.current.updateMetronome(currentExercise.bpm, currentExercise.timeSignature[0]);

        metronomeRef.current.start();
        setIsPlaying(true);
      }
    }
  };
  const runBeat = () => {
    setCurrentBeat((prev) => (prev === null ? 0 : prev + 1));
  };
  const changeExercise = (direction: 'next' | 'prev') => {
    const workout = workoutRef.current;
    const totalExercises = workout.exercises.length;
    const i = direction === 'next' ? currentExerciseIndex + 1 : currentExerciseIndex - 1;
    const nextExercise = workout.exercises[i];

    if (i < 0 || i >= totalExercises) return;

    setCurrentExercise(nextExercise);
    setCurrentExerciseIndex(i);
    setCurrentBeat(null);
    setCurrentMeasure(0);
    metronomeRef.current?.updateMetronome(nextExercise.bpm, nextExercise.timeSignature[0]);

    if (isPlaying) toggleMetronome();
  };
  const changeTempo = (count: 1 | -1) => {
    setCurrentExercise((prev) => {
      const newExercise = { ...prev, bpm: prev.bpm + count };
      workoutRef.current.exercises[currentExerciseIndex] = newExercise;
      return newExercise;
    });
    if (isPlaying) metronomeRef.current?.updateMetronome(currentExercise.bpm + count, currentExercise.timeSignature[0]);
  };
  const setRandomColor = () => {
    const colors = ['#7FAAEB', '#FF9E66', '#FF73D1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  useEffect(setRandomColor, [currentMeassure]);

  useEffect(() => {
    return () => {
      metronomeRef.current?.stop();
    };
  }, []);

  return (
    <MetronomeContext.Provider
      value={{
        color,
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
