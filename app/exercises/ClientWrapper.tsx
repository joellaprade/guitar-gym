'use client';

import SearchField from '@/reusable/components/SearchField';
import ExerciseList from './ExerciseList';
import { Exercise } from '@/reusable/models/Exercise';
import { useState } from 'react';

const ClientWrapper = ({ _exercises }: { _exercises: string }) => {
  const exercises = JSON.parse(_exercises) as Exercise[];
  const [result, setResult] = useState<Exercise[]>(exercises);

  return (
    <>
      <SearchField
        className="mt-8"
        placeholder="Buscar Ejercicio"
        ref={undefined}
        values={exercises}
        setter={setResult}
      />
      <ExerciseList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
