'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { BreakType } from '@/reusable/types/BreakType';
import { useRef, useState } from 'react';
import BreakOptions from './BreakOptions';
import ExerciseList from './ExerciseList';

const Create = ({ data }: { data: string }) => {
  const [title, setTitle] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<(Exercise | BreakType)[]>([]);

  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // FUNCTIONS

  return (
    <div className="vertical-container">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Título Rutina"
        className="bg-transparent text-4xl text-center mt-24"
      />
      <SearchField
        ref={searchRef}
        setIsFocused={setIsFocused}
        setSearch={setSearch}
        className="mt-8"
        placeholder="Buscar Ejercicio"
      />

      <ExerciseList
        data={data}
        searchRef={searchRef}
        isFocused={isFocused}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
      />

      <div className="mt-12 mb-8">
        <BreakOptions setData={setWorkoutExercises} />
        <button className="big main mt-4">Guardar</button>
      </div>
    </div>
  );
};

export default Create;
