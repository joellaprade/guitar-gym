import BackArrow from '@/reusable/components/BackArrow';
import ExerciseForm from '../../ExerciseForm';
import { Suspense } from 'react';
import { getExercises } from '@/reusable/actions/exercises/getExercises';
import ListSkeleton from '@/reusable/components/ListSkeleton';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const FetchWrapper = async ({ params }: Props) => {
  const { id } = await params;
  const [exercise] = await getExercises(id);

  return <ExerciseForm exercise={exercise} />;
};

const Edit = ({ params }: Props) => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-12 mb-8">Edit Exercise</h1>
        <Suspense fallback={<ListSkeleton />}>
          <FetchWrapper params={params} />
        </Suspense>
      </div>
    </>
  );
};

export default Edit;
