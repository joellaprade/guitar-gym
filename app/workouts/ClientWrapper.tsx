'use client';

import SearchField from '@/reusable/components/SearchField';
import { useState } from 'react';
import ListElement from '@/reusable/components/ListElement';
import { useRouter } from 'next/navigation';
import { deleteWorkout } from '@/reusable/actions/workouts/deleteWorkout';
import { Dispatch, SetStateAction } from 'react';
import EditBtn from '@/reusable/components/ui/EditBtn';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';
import { Workout } from '@/reusable/models/Workout';

const WorkoutList = ({
  result,
  setResult,
}: {
  result: Workout[];
  setResult: Dispatch<SetStateAction<Workout[]>>;
}) => {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`exercises/edit/${id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    deleteWorkout(id);
    setResult((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };

  return (
    <div className="mt-12 element-list">
      {result.map(({ title, exercises, id }: Workout, i: number) => (
        <ListElement
          title={title}
          subtitle={`${exercises.length} exercises`}
          actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
          deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
          key={i}
        />
      ))}
    </div>
  );
};

const ClientWrapper = ({ workouts }: { workouts: Workout[] }) => {
  const [result, setResult] = useState<Workout[]>(workouts);

  return (
    <>
      <SearchField
        values={workouts}
        setter={setResult}
        className="mt-8"
        placeholder="Buscar Rutina"
        ref={undefined}
      />
      <WorkoutList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
