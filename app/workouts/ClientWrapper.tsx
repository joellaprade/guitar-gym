'use client';

import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { useEffect, useState } from 'react';
import WorkoutList from './WorkoutList';

const ClientWrapper = ({ _workouts }: { _workouts: string }) => {
  const workouts = JSON.parse(_workouts) as Exercise[];
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Exercise[]>(workouts);

  const handleSearch = () => {
    let matches: Exercise[] = [];
    const lSearch = search.toLowerCase();

    if (lSearch === '') {
      setResult(workouts);
      return;
    }

    workouts.forEach((e) => {
      if (e.title.toLowerCase().includes(lSearch)) matches.push(e);
      else {
        for (let k of e.keywords) {
          if (k.toLowerCase().includes(lSearch)) {
            matches.push(e);
            break;
          }
        }
      }
    });

    setResult(matches);
  };

  useEffect(handleSearch, [search]);

  return (
    <>
      <SearchField setSearch={setSearch} className="mt-8" placeholder="Buscar Ejercicio" />
      <WorkoutList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
