import BackArrow from '@/reusable/components/BackArrow';
import ExerciceForm from './ExerciceForm';

const Create = () => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-24 mb-8">Crear Ejercicio</h1>
        <ExerciceForm />
      </div>
    </>
  );
};

export default Create;
