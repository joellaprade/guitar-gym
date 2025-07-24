import BackArrow from '@/reusable/components/BackArrow';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import NavBtn from '@/reusable/components/NavBtn';
import { Suspense } from 'react';
import ClientWrapper from './ClientWrapper';
import { getWorkouts } from '@/reusable/actions/workouts/getWorkouts';

const FetchWrapper = async () => {
  const workouts = (await getWorkouts()) || [];

  return <ClientWrapper workouts={workouts} />;
};

const Workouts = () => {
  return (
    <>
      <BackArrow link={'/home'} />
      <div className="vertical-container">
        <h1 className="mt-24">Rutinas</h1>
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper />
        </Suspense>
        <NavBtn text="Crear Rutina" href="/workouts/create" className="big main mt-12 mb-8" />
      </div>
    </>
  );
};

export default Workouts;
