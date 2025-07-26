'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { useState } from 'react';
import ListElement from '@/reusable/components/ListElement';
import { useRouter } from 'next/navigation';
import { deleteExercise } from '@/reusable/actions/exercises/deleteExercise';
import EditBtn from '@/reusable/components/ui/EditBtn';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';

const ExerciseList = ({ exercisesProp }: { exercisesProp: Exercise[] }) => {
  console.log('ExerciseList', exercisesProp);
  const [exercises, setExercises] = useState<Exercise[]>(exercisesProp);
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`exercises/edit/${id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    deleteExercise(id);
    setExercises((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };
  return (
    <>
      <SearchField
        className="mt-8"
        placeholder="Buscar Ejercicio"
        ref={undefined}
        values={exercisesProp}
        setter={setExercises}
      />
      <div className="mt-12 element-list">
        {exercises.map(({ title, bpm, id }: Exercise, i: number) => (
          <ListElement
            title={title}
            subtitle={`${bpm}bpm`}
            actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
            deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default ExerciseList;
