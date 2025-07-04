import NavBtn from '@/reusable/components/NavBtn';

const Home = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <h1>Bienvenido</h1>
      <div className="flex flex-col gap-5">
        <NavBtn text="Practicar" href="/practice" className="big main" />
        <NavBtn text="Rutinas" href="/workouts" className="big secondary" />
        <NavBtn text="Ejercicios" href="/exercises" className="big secondary" />
        <NavBtn text="Ajustes" href="/" className="big secondary" />
      </div>
    </div>
  );
};

export default Home;
