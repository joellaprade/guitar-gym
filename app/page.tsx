import NavBtn from '@/reusable/components/NavBtn';

export const experimental_ppr = true;

const Page = () => {
  return (
    <div>
      <h1 className="mt-48">Bienvenido</h1>
      <div className="absolute-center flex flex-col gap-4 w-full px-8">
        <NavBtn href="/signup" className="big main" text="Crear Cuenta" />
        <NavBtn href="/login" className="big secondary" text="Ingresar" />
        <div>s</div>
      </div>
    </div>
  );
};

export default Page;
