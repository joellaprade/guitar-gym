'use client';

import SearchField from '@/reusable/components/SearchField';
import ExerciseList from './ExerciseList';
import { Exercise } from '@/reusable/models/Exercise';
import { useState } from 'react';

const ClientWrapper = ({ _exercises }: { _exercises: string }) => {
  const [exercises, setExercises] = useState(JSON.parse(_exercises) as Exercise[]);

  return (
    <>
      <SearchField className="mt-8" placeholder="Buscar Ejercicio" />
      <ExerciseList exercises={exercises} />
    </>
  );
};

export default ClientWrapper;
