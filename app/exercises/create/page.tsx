import BackArrow from '@/reusable/components/BackArrow';
import ExerciseForm from '../ExerciseForm';

const Create = () => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-12 mb-8">Create Exercise</h1>
        <ExerciseForm />
      </div>
    </>
  );
};

export default Create;
