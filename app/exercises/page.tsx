import { getExercices } from '@/reusable/actions/getExercices';
import BackArrow from '@/reusable/components/BackArrow';
import NavBtn from '@/reusable/components/NavBtn';
import SearchField from '@/reusable/components/SearchField';
import ExerciceList from './ExerciceList';
import { Suspense } from 'react';

export const experimental_ppr = true;

const Exercises = () => {
  getExercices();

  return (
    <div className="vertical-container">
      <BackArrow link={'/home'} />
      <h1 className="mt-24">Ejercicios</h1>
      <SearchField className="mt-8" placeholder="Buscar Ejercicio" />
      <Suspense fallback={<p>Loading...</p>}>
        <ExerciceList />
      </Suspense>
      <NavBtn text="Crear Ejercicio" href="/exercises/create" className="big main mt-12 mb-8" />
    </div>
  );
};

export default Exercises;
