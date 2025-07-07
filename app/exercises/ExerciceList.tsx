import ListElement from '@/reusable/components/ListElement';
import { Pencil } from 'lucide-react';

const ExerciceList = () => {
  const PencilBtn = <Pencil className="text-white stroke-2" />;

  return (
    <div className="mt-12 element-list">
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
      <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={PencilBtn} deleteFunc={'e'} />
    </div>
  );
};

export default ExerciceList;
