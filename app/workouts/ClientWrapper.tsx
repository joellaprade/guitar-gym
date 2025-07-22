'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { useEffect, useState } from 'react';
import WorkoutList from './WorkoutList';
import { handleSearch } from '@/reusable/lib/utils';

const ClientWrapper = ({ _workouts }: { _workouts: string }) => {
  const workouts = JSON.parse(_workouts) as Exercise[];
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Exercise[]>(workouts);

  useEffect(() => {
    setResult(handleSearch(search, workouts));
  }, [search]);

  return (
    <>
      <SearchField
        className="mt-8"
        setSearch={setSearch}
        placeholder="Buscar Rutina"
        ref={undefined}
      />
      <WorkoutList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
