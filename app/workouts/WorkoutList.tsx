'use client';

import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import { deleteExercise } from '@/reusable/actions/exercises/deleteExercise';
import { Dispatch, SetStateAction } from 'react';

const DeleteBtn = ({
  id,
  setResult,
}: {
  id: string;
  setResult: Dispatch<SetStateAction<Exercise[]>>;
}) => {
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    deleteExercise(id);
    setResult((prevState) => {
      prevState.forEach((a) => {
        console.log(a._id.toString(), id, a._id.toString() !== id);
      });
      prevState = prevState.filter((p) => p._id.toString() !== id);
      return [...prevState];
    });
  };
  return <Trash onClick={handleDelete} className="text-white stroke-2 cursor-pointer" />;
};

type Props = { id: string };

const EditBtn = ({ id }: Props) => {
  const router = useRouter();
  return (
    <Pencil
      onClick={(e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        router.push(`exercises/edit/${id}`);
      }}
      className="text-white stroke-2 cursor-pointer"
    />
  );
};

const WorkoutList = ({
  result,
  setResult,
}: {
  result: Exercise[];
  setResult: Dispatch<SetStateAction<Exercise[]>>;
}) => {
  return (
    <div className="mt-12 element-list">
      {result.map(({ title, bpm, _id }: Exercise, i: number) => (
        <ListElement
          title={title}
          subtitle={`${bpm}bpm`}
          actionElement={<EditBtn id={_id.toString()} />}
          deleteElement={<DeleteBtn id={_id.toString()} setResult={setResult} />}
          key={i}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
