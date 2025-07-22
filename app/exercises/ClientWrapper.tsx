'use client';

import SearchField from '@/reusable/components/SearchField';
import ExerciseList from './ExerciseList';
import { Exercise } from '@/reusable/models/Exercise';
import { useEffect, useState } from 'react';
import { handleSearch } from '@/reusable/lib/utils';

const ClientWrapper = ({ _exercises }: { _exercises: string }) => {
  const exercises = JSON.parse(_exercises) as Exercise[];
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Exercise[]>(exercises);

  useEffect(() => {
    setResult(handleSearch(search, exercises));
  }, [search]);

  return (
    <>
      <SearchField
        setSearch={setSearch}
        className="mt-8"
        placeholder="Buscar Ejercicio"
        ref={undefined}
      />
      <ExerciseList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
