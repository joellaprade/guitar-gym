import BackArrow from '@/reusable/components/BackArrow';
import ExerciseForm from './ExerciseForm';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import { Skeleton } from '@/reusable/components/ui/skeleton';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const FetchWrapper = async ({ params }: Props) => {
  const { id } = await params;
  const exercise = (await getExercises(id))[0];

  return <ExerciseForm data={JSON.stringify(exercise)} />;
};

const Edit = ({ params }: Props) => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-24 mb-8">Editar Ejercicio</h1>
        <Suspense
          fallback={
            <div className="mt-12 element-list flex flex-col gap-4">
              <Skeleton className="w-full h-20 bg-gray" />
              <Skeleton className="w-full h-20 bg-gray" />
              <Skeleton className="w-full h-20 bg-gray" />
              <Skeleton className="w-full h-20 bg-gray" />
              <Skeleton className="w-full h-20 bg-gray" />
            </div>
          }
        >
          <FetchWrapper params={params} />
        </Suspense>
      </div>
    </>
  );
};

export default Edit;
