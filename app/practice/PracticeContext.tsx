'use client';

import { Exercise } from '@/reusable/models/Exercise';
import { Workout } from '@/reusable/models/Workout';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  workout: Workout;
  currentExercise: Exercise;
  currentBeat: number | null;
  currentMeassure: number;
  currentExerciseIndex: number;
  setCurrentExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  setCurrentBeat: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
};

const PracticeContext = createContext<ContextType | undefined>(undefined);

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) throw new Error('usePracticeContext must be used within a PracticeProvider');
  return context;
};

export const PracticeProvider = ({
  children,
  workout,
}: {
  children: React.ReactNode;
  workout: Workout;
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise>(workout.exercises[0]);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);
  const [currentMeassure, setCurrentMeasure] = useState(0);

  useEffect(() => {
    if (currentBeat && currentBeat % currentExercise.timeSignature[0] === 0) {
      setCurrentMeasure((prev) => prev + 1);
    }
  }, [currentBeat]);

  return (
    <PracticeContext.Provider
      value={{
        workout,
        currentExercise,
        currentBeat,
        currentMeassure,
        currentExerciseIndex,
        setCurrentExercise,
        setCurrentBeat,
        setCurrentExerciseIndex,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
