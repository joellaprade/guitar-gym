'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { useEffect, useRef, useState } from 'react';
import ExerciseList from './ExerciseList';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { saveWorkout } from '@/reusable/actions/workouts/saveWorkout';
import { useRouter } from 'next/navigation';
import { Workout } from '@/reusable/models/Workout';
import { updateWorkout } from '@/reusable/actions/workouts/updateWorkout';
import { ArrowUpDown } from 'lucide-react';

type Props = {
  exercises: Exercise[];
  workout?: Workout;
};

const WorkoutForm = ({ exercises, workout }: Props) => {
  const isEdit = workout !== undefined;
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const { data, loading, runAction } = useFetchServerAction(isEdit ? updateWorkout : saveWorkout);

  const [title, setTitle] = useState(workout?.title || '');
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>(workout?.exercises || []);
  const [userExercises, setUserExercises] = useState<Exercise[]>(exercises);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const handleSubmitWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('exercises', JSON.stringify(workoutExercises));
    if (workout) {
      formData.append('userId', workout.userId);
      formData.append('id', workout.id);
    }

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
        placeholder="Workout Title"
        className="bg-transparent text-4xl text-center mt-12"
      />
      <div className="flex mt-4 gap-3">
        <SearchField<Exercise>
          values={exercises}
          setter={setUserExercises}
          ref={searchRef}
          setIsFocused={setIsFocused}
          className="flex-grow"
          placeholder="Add Exercise"
        />
        <ArrowUpDown onClick={() => setIsReversed((prev) => !prev)} className={`stroke-white m-auto rounded-full ${isReversed && 'bg-gray'}`} />
      </div>

      <ExerciseList
        exercises={userExercises}
        searchRef={searchRef}
        isFocused={isFocused}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
        isReversed={isReversed}
      />

      <div className="mb-8">
        <button type={`${isValid && !loading ? 'submit' : 'button'}`} className={`big main mt-4 ${isValid && !loading ? '' : 'opacity-50'}`}>
          {loading ? 'Sending...' : isEdit ? 'Save' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
