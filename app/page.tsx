import NavBtn from '@/reusable/components/NavBtn';

const Page = () => {
  return (
    <div>
      <h1 className="mt-48">Welcome</h1>
      <div className="absolute-center flex flex-col gap-4 w-full px-8">
        <NavBtn href="/signup" className="big main" text="Crear Cuenta" />
        <NavBtn href="/login" className="big secondary" text="Ingresar" />
      </div>
    </div>
  );
};

export default Page;
