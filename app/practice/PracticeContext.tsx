'use client';

import { Exercise } from '@/reusable/models/Exercise';
import { Workout } from '@/reusable/models/Workout';
import { createContext, useContext, useState } from 'react';

type ContextType = {
  workout: Workout;
  currentExercise: Exercise;
  currentBeat: number;
  currentExerciseIndex: number;
  setCurrentExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  setCurrentBeat: React.Dispatch<React.SetStateAction<number>>;
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
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  return (
    <PracticeContext.Provider
      value={{
        workout,
        currentExercise,
        currentBeat,
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
