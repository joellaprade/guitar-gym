'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { Break } from '@/reusable/models/Break';
import { useEffect, useRef, useState } from 'react';
import BreakOptions from './BreakOptions';
import ExerciseList from './ExerciseList';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { saveWorkout } from '@/reusable/actions/workouts/saveWorkout';
import { useRouter } from 'next/navigation';
import { formatWorkoutToDB } from '@/reusable/lib/utils';

const Create = ({ exercises }: { exercises: Exercise[] }) => {
  const router = useRouter();
  const { data, loading, runAction } = useFetchServerAction(saveWorkout);

  const [title, setTitle] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<(Exercise | Break)[]>([]);

  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmitWorkout = () => {
    const formData = new FormData();
    const workoutData = formatWorkoutToDB(workoutExercises);

    formData.append('title', title);
    formData.append('workoutData', JSON.stringify(workoutData));

    runAction(formData);
  };

  useEffect(() => {
    if (data) router.push('/exercises');
  }, [data]);

  return (
    <form className="vertical-container" onSubmit={handleSubmitWorkout}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Título Rutina"
        className="bg-transparent text-4xl text-center mt-24"
      />
      <SearchField
        ref={searchRef}
        setIsFocused={setIsFocused}
        setSearch={setSearch}
        className="mt-8"
        placeholder="Agregar Ejercicio"
      />

      <ExerciseList
        exercises={exercises}
        searchRef={searchRef}
        isFocused={isFocused}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
      />

      <div className="mt-12 mb-8">
        <BreakOptions setData={setWorkoutExercises} />
        <button className="big main mt-4">Guardar</button>
      </div>
    </form>
  );
};

export default Create;
