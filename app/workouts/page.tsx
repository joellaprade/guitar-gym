import BackArrow from '@/reusable/components/BackArrow';
import ListElement from '@/reusable/components/ListElement';
import NavBtn from '@/reusable/components/NavBtn';
import SearchField from '@/reusable/components/SearchField';
import { Pencil } from 'lucide-react';

const Workouts = () => {
  const PencilBtn = <Pencil className="text-white stroke-2" />;
  return (
    <>
      <BackArrow link={'/'} />
      <div className="vertical-container">
        <h1 className="mt-24">Rutinas</h1>
        <SearchField className="mt-8" placeholder="Buscar Rutina" />

        <div className="element-list mt-12">
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
        <NavBtn text="Crear Rutina" href="/workouts/create" className="big main mt-12 mb-4" />
      </div>
    </>
  );
};

export default Workouts;
