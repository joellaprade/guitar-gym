'use client';

import SearchField from '@/reusable/components/SearchField';
import { useState } from 'react';
import ListElement from '@/reusable/components/ListElement';
import { useRouter } from 'next/navigation';
import { deleteWorkout } from '@/reusable/actions/workouts/deleteWorkout';
import EditBtn from '@/reusable/components/ui/EditBtn';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';
import { Workout } from '@/reusable/models/Workout';

const WorkoutList = ({ workoutsProp }: { workoutsProp: Workout[] }) => {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>(workoutsProp);

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`workouts/edit/${id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    deleteWorkout(id);
    setWorkouts((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };
  return (
    <>
      <SearchField
        values={workoutsProp}
        setter={setWorkouts}
        className="mt-8"
        placeholder="Search Workout"
        ref={undefined}
      />
      <div className="mt-12 element-list">
        {workouts.length > 0 ? (
          workouts.map(({ title, exercises, id }: Workout, i: number) => (
            <ListElement
              title={title}
              subtitle={`${exercises.length} exercises`}
              actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
              deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
              key={i}
            />
          ))
        ) : (
          <div className="text-center flex flex-center flex-col gap-4 h-full">
            <h3>You have not created a workout yet!</h3>
            <button className="small main" onClick={() => router.push('/workouts/create')}>
              Create Workout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutList;
