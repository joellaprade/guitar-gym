'use client';

import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { Break } from '@/reusable/models/Break';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import WorkoutList from './WorkoutList';
import AddBtn from '@/reusable/components/ui/AddBtn';

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
  const [userExercises, setUserExercises] = useState<Exercise[]>(exercises);

  const handleAdd = (event: React.MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation();
    const exercise = userExercises.find((e) => e.id === id);
    if (!exercise) return;
    setWorkoutExercises((prevState) => [...prevState, exercise]);
  };

  const handleClick = () => {
    searchRef.current?.focus();
  };

  return (
    <div className="element-list mt-12 relative">
      <span className="absolute font-semibold">
        {isFocused ? 'Tus Ejercicios:' : 'Ejercicios de Esta Rutina:'}
      </span>
      {isFocused ? (
        userExercises.map((e, i) => (
          <ListElement
            title={e.title}
            subtitle={`${e.bpm}bpm`}
            actionElement={<AddBtn onMouseDown={(event) => handleAdd(event, e.id)} />}
            key={i}
          />
        ))
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
