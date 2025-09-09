'use client';

import { Exercise } from '@/reusable/models/Exercise';
import { Workout } from '@/reusable/models/Workout';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type ContextType = {
  workoutRef: React.RefObject<Workout>;
  currentBeat: number | null;
  currentMeassure: number;
  currentExercise: Exercise;
  currentExerciseIndex: number;
  elapsedTime: number;
  setCurrentBeat: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentMeasure: React.Dispatch<React.SetStateAction<number>>;
  setCurrentExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
};

const PracticeContext = createContext<ContextType | undefined>(undefined);

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) throw new Error('usePracticeContext must be used within a PracticeProvider');
  return context;
};

export const PracticeProvider = ({ children, workout }: { children: React.ReactNode; workout: Workout }) => {
  const workoutRef = useRef(workout);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise>(workout.exercises[0]);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  const [currentMeassure, setCurrentMeasure] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(1);

  useEffect(() => {
    if (currentBeat && currentBeat % currentExercise.timeSignature[0] === 0) {
      setCurrentMeasure((prev) => prev + 1);
    }
  }, [currentBeat]);
  useEffect(() => {
    setInterval(() => setElapsedTime((prev) => ++prev), 1000);
  }, []);

  return (
    <PracticeContext.Provider
      value={{
        workoutRef,
        currentExercise,
        currentBeat,
        currentMeassure,
        currentExerciseIndex,
        elapsedTime,
        setCurrentBeat,
        setCurrentMeasure,
        setCurrentExercise,
        setCurrentExerciseIndex,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
