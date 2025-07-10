import BackArrow from '@/reusable/components/BackArrow';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ListSkeleton from '@/reusable/components/ListSkeleton';
import Create from './Create';

const FetchWrapper = async () => {
  const exercises = await getExercises();

  return <Create data={JSON.stringify(exercises)} />;
};

const Edit = () => {
  return (
    <>
      <BackArrow link="/workouts" />
      <div className="vertical-container">
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper />
        </Suspense>
      </div>
    </>
  );
};

export default Edit;
