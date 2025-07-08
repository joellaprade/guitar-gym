'use client';

import ListElement from '@/reusable/components/ListElement';
import { Exercise } from '@/reusable/models/Exercise';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

const DeleteBtn = ({ id }: { id: string }) => {
  return <Trash className="text-white stroke-2" />;
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

const ExerciseList = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <div className="mt-12 element-list">
      {exercises.map(({ title, bpm, _id }: Exercise, i: number) => (
        <ListElement
          title={title}
          subtitle={`${bpm}bpm`}
          actionElement={<EditBtn id={_id.toString()} />}
          deleteElement={<DeleteBtn id={_id.toString()} />}
          key={i}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
