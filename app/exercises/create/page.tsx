import BackArrow from '@/reusable/components/BackArrow';

const Create = () => {
  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-24">Crear Ejercicio</h1>
        <form className="flex flex-col gap-5 my-auto">
          <div>
            <label>Titulo</label>
            <input type="text" />
          </div>
          <div>
            <label>BPM</label>
            <input type="number" />
          </div>
          <div>
            <label>Compás</label>
            <input type="text" />
          </div>
          <div>
            <label>Número de Compases</label>
            <input type="number" />
          </div>
          <div>
            <label>Keywords (opcional)</label>
            <input type="text" />
          </div>
        </form>
        <button className="big main mb-4">Guardar</button>
      </div>
    </>
  );
};

export default Create;
