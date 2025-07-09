'use client';

import SearchField from '@/reusable/components/SearchField';
import ExerciseList from './ExerciseList';
import { Exercise } from '@/reusable/models/Exercise';
import { useEffect, useState } from 'react';

const ClientWrapper = ({ _exercises }: { _exercises: string }) => {
  const exercises = JSON.parse(_exercises) as Exercise[];
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Exercise[]>(exercises);

  const handleSearch = () => {
    let matches: Exercise[] = [];

    if (search === '') {
      setResult(exercises);
      return;
    }

    exercises.forEach((e) => {
      if (e.title.includes(search)) matches.push(e);
      else {
        e.keywords.forEach((k) => {
          if (k.includes(search)) matches.push(e);
        });
      }
    });

    setResult(matches);
  };

  useEffect(handleSearch, [search]);

  return (
    <>
      <SearchField setSearch={setSearch} className="mt-8" placeholder="Buscar Ejercicio" />
      <ExerciseList result={result} setResult={setResult} />
    </>
  );
};

export default ClientWrapper;
