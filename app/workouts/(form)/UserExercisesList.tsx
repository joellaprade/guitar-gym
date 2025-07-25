import ListElement from '@/reusable/components/ListElement';
import AddBtn from '@/reusable/components/ui/AddBtn';
import { Break } from '@/reusable/models/Break';
import { Exercise } from '@/reusable/models/Exercise';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  exercises: Exercise[];
  setWorkoutExercises: Dispatch<SetStateAction<(Exercise | Break)[]>>;
};

const UserExercisesList = ({ exercises, setWorkoutExercises }: Props) => {
  const handleAdd = (event: React.MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation();
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) return;
    setWorkoutExercises((prevState) => [...prevState, exercise]);
  };

  return exercises.map((e, i) => (
    <ListElement
      title={e.title}
      subtitle={`${e.bpm}bpm`}
      actionElement={<AddBtn onMouseDown={(event) => handleAdd(event, e.id)} />}
      key={i}
    />
  ));
};

export default UserExercisesList;
