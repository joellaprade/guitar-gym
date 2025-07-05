import BackArrow from '@/reusable/components/BackArrow';
import ListElement from '@/reusable/components/ListElement';
import { Play } from 'lucide-react';

const Exercises = () => {
  const PlayBtn = <Play className="text-white stroke-2 fill-white rounded-full" />;
  return (
    <>
      <BackArrow link={'/home'} />
      <div className="vertical-container">
        <h1 className="mt-24">Selecciona Una Rutina</h1>
        <div className="mt-24 mb-24 element-list">
          <ListElement
            title={'Alt. Picking'}
            subtitle={'140bpm'}
            action={PlayBtn}
            deleteFunc={'e'}
          />
          <ListElement
            title={'Alt. Picking'}
            subtitle={'140bpm'}
            action={PlayBtn}
            deleteFunc={'e'}
          />
        </div>
      </div>
    </>
  );
};

export default Exercises;
