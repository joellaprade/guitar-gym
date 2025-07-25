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
  return workouts.map((workout) => (
    <ListElement
      key={workout.id}
      title={workout.title}
      subtitle={`${workout.exercises.length} exercises`}
      actionElement={
        <PlayBtn
          onMouseDown={() => router.push(`practice/${workout.id}`)}
          className="text-white stroke-2 fill-white w-5 h-5"
        />
      }
    />
  ));
};

export default WorkoutList;
