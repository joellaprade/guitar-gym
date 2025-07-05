import BackArrow from '@/reusable/components/BackArrow';
import ListElement from '@/reusable/components/ListElement';
import NavBtn from '@/reusable/components/NavBtn';
import SearchField from '@/reusable/components/SearchField';
import { Pencil } from 'lucide-react';

const Exercises = () => {
  const PencilBtn = <Pencil className="text-white stroke-2" />;
  return (
    <div className="vertical-container">
      <BackArrow link={'/home'} />
      <h1 className="mt-24">Ejercicios</h1>
      <SearchField className="mt-8" placeholder="Buscar Ejercicio" />
      <div className="mt-12 element-list">
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
        <ListElement
          title={'Alt. Picking'}
          subtitle={'140bpm'}
          action={PencilBtn}
          deleteFunc={'e'}
        />
      </div>
      <NavBtn text="Crear Ejercicio" href="/exercises/create" className="big main mt-12 mb-8" />
    </div>
  );
};

export default Exercises;
