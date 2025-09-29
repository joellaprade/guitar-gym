'use client';

import ListElement from '@/reusable/components/ListElement';
import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { Workout } from '@/reusable/models/Workout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  workouts: Workout[];
};

const WorkoutList = ({ workouts }: Props) => {
  const router = useRouter();
  return workouts.length > 0 ? (
    workouts.map((workout) => {
      return (
        workout.exercises.length > 0 && (
          <Link href={`/practice/${workout.id}`} key={workout.id}>
            <ListElement
              key={workout.id}
              title={workout.title}
              subtitle={`${workout.exercises.length} exercises`}
              actionElement={<PlayBtn className={`h-5 w-5 fill-white stroke-2 text-white`} />}
            />
          </Link>
        )
      );
    })
  ) : (
    <div className="flex-center flex h-full flex-col gap-4 text-center">
      <h3>You have not created a workout yet!</h3>
      <button className="small main" onClick={() => router.push('/workouts/create')}>
        Create Workout
      </button>
    </div>
  );
};

export default WorkoutList;
