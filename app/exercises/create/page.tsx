import BackArrow from '@/reusable/components/BackArrow';
import ExerciseForm from '../ExerciseForm';

const Create = () => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-24 mb-8">Crear Ejercicio</h1>
        <ExerciseForm />
      </div>
    </>
  );
};

export default Create;
