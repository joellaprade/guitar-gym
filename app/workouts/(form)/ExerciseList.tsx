'use client';

import { Exercise } from '@/reusable/models/Exercise';
import { Break } from '@/reusable/models/Break';
import { Dispatch, RefObject, SetStateAction } from 'react';
import WorkoutList from './WorkoutExercisesList';
import UserExercisesList from './UserExercisesList';

type Props = {
  exercises: Exercise[];
  searchRef: RefObject<HTMLInputElement | null>;
  isFocused: boolean;
  workoutExercises: (Exercise | Break)[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | Break)[]>>;
};

const ExerciseList = ({
  exercises,
  searchRef,
  isFocused,
  setWorkoutExercises,
  workoutExercises,
}: Props) => {
  const handleClick = () => {
    searchRef.current?.focus();
  };

  return (
    <div className="element-list mt-12 relative">
      <span className="absolute font-semibold">
        {isFocused ? 'Tus Ejercicios:' : 'Ejercicios de Esta Rutina:'}
      </span>
      {isFocused ? (
        <UserExercisesList exercises={exercises} setWorkoutExercises={setWorkoutExercises} />
      ) : workoutExercises.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <button onClick={handleClick} className="main small">
            Agregar Ejercicios
          </button>
        </div>
      ) : (
        <WorkoutList
          workoutExercises={workoutExercises}
          setWorkoutExercises={setWorkoutExercises}
        />
      )}
    </div>
  );
};

export default ExerciseList;
