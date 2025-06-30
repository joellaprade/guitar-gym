const Home = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <h1>Bienvenido</h1>
      <div className="flex flex-col gap-5">
        <button className="main big">Practicar</button>
        <button className="secondary big">Rutinas</button>
        <button className="secondary big">Ejercicios</button>
        <button className="secondary big">Ajustes</button>
      </div>
    </div>
  );
};

export default Home;
