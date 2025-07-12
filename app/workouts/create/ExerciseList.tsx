'use client';

import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { BreakType } from '@/reusable/types/BreakType';
import { PlusIcon } from 'lucide-react';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import WorkoutList from './WorkoutList';

type AddProps = {
  exercise: Exercise;
  setData: Dispatch<SetStateAction<(Exercise | BreakType)[]>>;
};
type Props = {
  data: string;
  searchRef: RefObject<HTMLInputElement | null>;
  isFocused: boolean;
  workoutExercises: (Exercise | BreakType)[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | BreakType)[]>>;
};

const AddBtn = ({ exercise, setData }: AddProps) => {
  const handleAdd = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setData((prevState) => [...prevState, exercise]);
  };

  return <PlusIcon onMouseDown={handleAdd} className="text-white cursor-pointer" />;
};
const ExerciseList = ({
  data,
  searchRef,
  isFocused,
  setWorkoutExercises,
  workoutExercises,
}: Props) => {
  const parsedData = JSON.parse(data) as Exercise[];
  const [userExercises, setUserExercises] = useState<Exercise[]>(parsedData);

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
            actionElement={<AddBtn exercise={e} setData={setWorkoutExercises} />}
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
