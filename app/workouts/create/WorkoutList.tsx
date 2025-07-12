'use client';

import { Dispatch, SetStateAction, useRef } from 'react';
import { GripVertical, Trash } from 'lucide-react';
import { Exercise } from '@/reusable/models/Exercise';
import { BreakType } from '@/reusable/types/BreakType';
import ListElement from '@/reusable/components/ListElement';

type GripProps = {
  id: string;
  setData: Dispatch<SetStateAction<(Exercise | BreakType)[]>>;
};
type DeleteProps = {
  id: string;
  setData: Dispatch<SetStateAction<(Exercise | BreakType)[]>>;
};
type WorkoutListProps = {
  workoutExercises: (Exercise | BreakType)[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | BreakType)[]>>;
};

const GripBtn = ({ id, setData }: GripProps) => {
  const gripRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = () => {};

  return (
    <GripVertical
      ref={gripRef}
      onMouseDown={handleMouseDown}
      className="text-white cursor-pointer"
    />
  );
};
const DeleteBtn = ({ id, setData }: DeleteProps) => {
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    // deleteExercise(id); QUITAR DE WORKOUT, NO DB
    setData((prevState) => {
      prevState = prevState.filter((p) => p._id.toString() !== id);
      return [...prevState];
    });
  };

  return <Trash onClick={handleDelete} className="text-white stroke-2 cursor-pointer" />;
};

const WorkoutList = ({ workoutExercises, setWorkoutExercises }: WorkoutListProps) => {
  return workoutExercises.map((e, i) => {
    if (e.title === 'Break') {
      let _e = e as BreakType;
      return (
        <ListElement
          title={_e.title}
          subtitle={`${_e.duration}`}
          actionElement={<GripBtn id={_e._id.toString()} setData={setWorkoutExercises} />}
          deleteElement={<DeleteBtn id={_e._id.toString()} setData={setWorkoutExercises} />}
          key={i}
        />
      );
    } else {
      let _e = e as Exercise;
      return (
        <ListElement
          title={e.title}
          subtitle={`${_e.bpm}bpm`}
          actionElement={<GripBtn id={e._id.toString()} setData={setWorkoutExercises} />}
          deleteElement={<DeleteBtn id={_e._id.toString()} setData={setWorkoutExercises} />}
          key={i}
        />
      );
    }
  });
};

export default WorkoutList;
