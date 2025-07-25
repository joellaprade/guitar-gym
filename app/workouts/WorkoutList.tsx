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
        values={workouts}
        setter={setWorkouts}
        className="mt-8"
        placeholder="Buscar Rutina"
        ref={undefined}
      />
      <div className="mt-12 element-list">
        {workouts.map(({ title, exercises, id }: Workout, i: number) => (
          <ListElement
            title={title}
            subtitle={`${exercises.length} exercises`}
            actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
            deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default WorkoutList;
