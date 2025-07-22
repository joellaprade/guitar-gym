'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Exercise } from '@/reusable/models/Exercise';
import { Break } from '@/reusable/models/Break';
import ListElement from '@/reusable/components/ListElement';
import DeleteBtn from '@/reusable/components/ui/DeleteBtn';
import { useDragItem } from '@/reusable/hooks/useDragItem';

const GripBtn = ({
  id,
  setSelectedId,
}: {
  id: string;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}) => {
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
  workoutExercises: (Exercise | Break)[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | Break)[]>>;
};
const WorkoutList = ({ workoutExercises, setWorkoutExercises }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (event: React.MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation();
    // deleteExercise(id); QUITAR DE WORKOUT, NO DB
    setWorkoutExercises((prevState) => {
      prevState = prevState.filter((p) => p.id !== id);
      return [...prevState];
    });
  };
  useDragItem(selectedId, workoutExercises, setWorkoutExercises, setSelectedId);

  return workoutExercises.map((e, i) => {
    if (e.title === 'Break') {
      e = e as Break;
      return (
        <ListElement
          title={e.title}
          subtitle={`${e.duration}`}
          actionElement={<GripBtn id={e.id} setSelectedId={setSelectedId} />}
          deleteElement={<DeleteBtn onMouseDown={(event) => handleDelete(event, e.id)} />}
          id={e.id}
          key={i}
          className={`${selectedId && e.id !== selectedId && 'opacity-50'}`}
        />
      );
    } else {
      e = e as Exercise;
      return (
        <ListElement
          title={e.title}
          subtitle={`${e.bpm}bpm`}
          actionElement={<GripBtn id={e.id} setSelectedId={setSelectedId} />}
          deleteElement={<DeleteBtn onMouseDown={(event) => handleDelete(event, e.id)} />}
          id={e.id}
          key={i}
          className={`${selectedId && e.id !== selectedId && 'opacity-50'}`}
        />
      );
    }
  });
};

export default WorkoutList;
