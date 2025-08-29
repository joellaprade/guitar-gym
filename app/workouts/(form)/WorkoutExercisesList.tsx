'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Exercise } from '@/reusable/models/Exercise';
import ListElement from '@/reusable/components/ListElement';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';
import { useDragItem } from '@/reusable/hooks/useDragItem';
import { useRouter } from 'next/navigation';
import EditBtn from '@/reusable/components/ui/EditBtn';

const GripBtn = ({ id, setSelectedId }: { id: string; setSelectedId: Dispatch<SetStateAction<string | null>> }) => {
  const gripRef = useRef<SVGSVGElement>(null);

  return (
    <GripVertical
      ref={gripRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
      onTouchEnd={() => setSelectedId(null)}
      onMouseUp={() => setSelectedId(null)}
      className="text-white cursor-pointer"
    />
  );
};

type Props = {
  workoutExercises: Exercise[];
  isReversed: boolean;
  setWorkoutExercises: Dispatch<SetStateAction<Exercise[]>>;
};
const WorkoutList = ({ isReversed, workoutExercises, setWorkoutExercises }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    router.push(`/exercises/edit/${id}`);
  };
  const handleDelete = (event: React.MouseEvent<SVGSVGElement>, index: number) => {
    event.stopPropagation();
    setWorkoutExercises((prevState) => {
      prevState = prevState.filter((p, i) => i !== index);
      return [...prevState];
    });
  };
  const finalExercises = isReversed ? [...workoutExercises].reverse() : workoutExercises;

  useDragItem(selectedId, workoutExercises, setWorkoutExercises, setSelectedId);

  return finalExercises.map((e, i) => (
    <ListElement
      title={e.title}
      subtitle={`${e.bpm}bpm`}
      actionElement={
        <>
          <EditBtn className="mx-5" onMouseDown={(event) => handleEdit(event, e.id)} />
          <GripBtn id={e.id} setSelectedId={setSelectedId} />
        </>
      }
      deleteElement={<DeleteBtn onMouseDown={(event) => handleDelete(event, i)} />}
      id={e.id}
      key={i}
      className={`${selectedId ? e.id !== selectedId && 'opacity-50' : ''}`}
    />
  ));
};

export default WorkoutList;
