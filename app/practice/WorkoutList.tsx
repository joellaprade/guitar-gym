'use client';

import ListElement from '@/reusable/components/ListElement';
import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { Workout } from '@/reusable/models/Workout';
import { useRouter } from 'next/navigation';

type Props = {
  workouts: Workout[];
};

const WorkoutList = ({ workouts }: Props) => {
  const router = useRouter();
  return workouts.length > 0 ? (
    workouts.map((workout) => {
      const isValid = workout.exercises.length > 0;

      return (
        <ListElement
          key={workout.id}
          title={workout.title}
          subtitle={`${workout.exercises.length} exercises`}
          actionElement={
            <PlayBtn
              onMouseDown={() => isValid && router.push(`practice/${workout.id}`)}
              className={`text-white stroke-2 fill-white w-5 h-5 ${isValid ? '' : 'opacity-50'}`}
            />
          }
        />
      );
    })
  ) : (
    <div className="text-center flex flex-center flex-col gap-4 h-full">
      <h3>You have not created a workout yet!</h3>
      <button className="small main" onClick={() => router.push('/workouts/create')}>
        Create Workout
      </button>
    </div>
  );
};

export default WorkoutList;
