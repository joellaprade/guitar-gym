import BackArrow from '@/reusable/components/BackArrow';
import ListElement from '@/reusable/components/ListElement';
import NavBtn from '@/reusable/components/NavBtn';
import { Pencil, Search } from 'lucide-react';

const Exercises = () => {
  const PencilBtn = <Pencil className="text-white stroke-2" />;
  return (
    <>
      <BackArrow link={'/'} />
      <div className="h-full flex flex-col justify-evenly relative">
        <h1>Ejercicios</h1>
        <form className="relative">
          <input className="w-full" type="text" placeholder="Buscar Rutina" />
          <div className="aspect-square h-full absolute top-0 right-0 flex items-center justify-center">
            <Search className="text-[#919191] w-5 h-5 stroke-3" />
          </div>
        </form>
        <div className="h-[33vh] overflow-scroll scrollbar-none">
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
          <ListElement title={'Alt. Picking'} subtitle={'140bpm'} btn={PencilBtn} id={'e'} />
        </div>
        <NavBtn
          text="Crear Ejercicio"
          href="/exercises/create"
          className="absolute big main bottom-3.5"
        />
      </div>
    </>
  );
};

export default Exercises;
