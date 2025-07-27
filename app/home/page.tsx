import NavBtn from '@/reusable/components/NavBtn';

const Home = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <h1>Welcome</h1>
      <div className="flex flex-col gap-5">
        <NavBtn text="Practice" href="/practice" className="big main" />
        <NavBtn text="Workouts" href="/workouts" className="big secondary" />
        <NavBtn text="Exercises" href="/exercises" className="big secondary" />
        <NavBtn text="Settings" href="/settings" className="big secondary" />
      </div>
    </div>
  );
};

export default Home;
