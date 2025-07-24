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

const WorkoutForm = ({ exercises }: { exercises: Exercise[] }) => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const { data, loading, runAction } = useFetchServerAction(saveWorkout);

  const [title, setTitle] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<(Exercise | Break)[]>([]);
  const [userExercises, setUserExercises] = useState<Exercise[]>(exercises);

  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmitWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const workoutData = formatWorkoutToDB(workoutExercises);

    formData.append('title', title);
    formData.append('exercises', JSON.stringify(workoutData));

    runAction(formData);
  };
  const validateData = () => {
    if (!title || workoutExercises.length <= 0) setIsValid(false);
    else setIsValid(true);
  };

  useEffect(validateData, [title, workoutExercises]);
  useEffect(() => {
    if (data) router.push('/workouts');
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
      <SearchField<Exercise>
        values={userExercises}
        setter={setUserExercises}
        ref={searchRef}
        setIsFocused={setIsFocused}
        className="mt-8"
        placeholder="Agregar Ejercicio"
      />

      <ExerciseList
        exercises={userExercises}
        searchRef={searchRef}
        isFocused={isFocused}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
      />

      <div className="mt-12 mb-8">
        <BreakOptions setData={setWorkoutExercises} />
        <button
          type={`${isValid && !loading ? 'submit' : 'button'}`}
          className={`big main mt-4 ${isValid && !loading ? '' : 'opacity-50'}`}
        >
          {loading ? 'Enviando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
