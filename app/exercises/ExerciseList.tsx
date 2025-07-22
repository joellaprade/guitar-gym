'use client';

import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { useRouter } from 'next/navigation';
import { deleteExercise } from '@/reusable/actions/exercises/deleteExercise';
import { Dispatch, SetStateAction } from 'react';
import EditBtn from '@/reusable/components/ui/EditBtn';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';

const ExerciseList = ({
  result,
  setResult,
}: {
  result: Exercise[];
  setResult: Dispatch<SetStateAction<Exercise[]>>;
}) => {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`exercises/edit/${id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    e.stopPropagation();
    deleteExercise(id);
    setResult((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };

  return (
    <div className="mt-12 element-list">
      {result.map(({ title, bpm, id }: Exercise, i: number) => (
        <ListElement
          title={title}
          subtitle={`${bpm}bpm`}
          actionElement={<EditBtn onMouseDown={(e) => handleEdit(e, id)} />}
          deleteElement={<DeleteBtn onMouseDown={(e) => handleDelete(e, id)} />}
          key={i}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
