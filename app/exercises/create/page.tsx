import BackArrow from '@/reusable/components/BackArrow';

const Create = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <BackArrow link="/exercises" />

      <div className="flex flex-grow flex-col justify-evenly relative">
        <h1>Crear Ejercicio</h1>
        <form className="flex flex-col gap-5">
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
      </div>
      <button className="big main mb-3.5">Guardar</button>
    </div>
  );
};

export default Create;
