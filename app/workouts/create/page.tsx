'use client';

import BackArrow from '@/reusable/components/BackArrow';
import ListElement from '@/reusable/components/ListElement';
import SearchField from '@/reusable/components/SearchField';
import { GripVertical, Plus } from 'lucide-react';
import { useState } from 'react';

const Create = () => {
  const [showBreakInput, setShowBreakInput] = useState(false);
  const [breakTime, setBreakTime] = useState<number>(0);
  const gripBtn = <GripVertical className="text-white" />;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="vertical-container">
      <BackArrow link="/workouts" />
      <input
        type="text"
        placeholder="Título Rutina"
        className="bg-transparent text-4xl text-center mt-24"
      />
      <SearchField className="mt-8" placeholder="Buscar Rutina" />

      <div className="element-list mt-12">
        <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={gripBtn} deleteFunc={'e'} />
        <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={gripBtn} deleteFunc={'e'} />
        <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={gripBtn} deleteFunc={'e'} />
        <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={gripBtn} deleteFunc={'e'} />
        <ListElement title={'Alt. Picking'} subtitle={'140bpm'} action={gripBtn} deleteFunc={'e'} />
      </div>
      <div className="mt-12 mb-8">
        <div className={`flex relative `}>
          <input
            className={`transition-all duration-1000 ease-in-out ${showBreakInput ? 'flex-grow mr-3' : 'flex-grow-0 p-0'} w-0`}
            value={breakTime}
            onChange={(e) => {
              setBreakTime(Number(e.target.value));
            }}
            onFocus={handleFocus}
            type="number"
            placeholder="Segundos"
          />
          <button
            onClick={() => setShowBreakInput(true)}
            className={`secondary transition-all duration-1000 ease-in-out p-2.5 flex justify-center ${showBreakInput ? 'bg-white' : 'flex-grow'}`}
          >
            <Plus
              className={`transition-all duration-1000 ease-in-out text-black w-[20px] h-[20px] stroke-2 delay-300 ${showBreakInput ? 'opacity-100' : 'opacity-0'}`}
            />
            <span
              className={`transition-all duration-300 text-white text-sm absolute ${showBreakInput ? 'opacity-0' : 'opacity-100'}`}
            >
              Agregar descanzo
            </span>
          </button>
        </div>
        <button className="big main mt-4">Guardar</button>
      </div>
    </div>
  );
};

export default Create;
