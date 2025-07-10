'use client';

import ListElement from '@/reusable/components/ListElement';
import SearchField from '@/reusable/components/SearchField';
import { Exercise } from '@/reusable/models/Exercise';
import { GripVertical, Plus, PlusIcon, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type EditProps = { id: string };
type DeleteProps = {
  id: string;
  setResult: Dispatch<SetStateAction<Exercise[]>>;
};

const GripBtn = () => {
  return <GripVertical className="text-white" />;
};
const AddBtn = () => {
  return <PlusIcon className="text-white cursor-pointer" />;
};
const DeleteBtn = ({ id, setResult }: DeleteProps) => {
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    // deleteExercise(id); QUITAR DE WORKOUT, NO DB
    setResult((prevState) => {
      prevState = prevState.filter((p) => p._id.toString() !== id);
      return [...prevState];
    });
  };
  return <Trash onClick={handleDelete} className="text-white stroke-2 cursor-pointer" />;
};

const BreakOptions = () => {
  const [breakTime, setBreakTime] = useState<number>(0);
  const [showBreakInput, setShowBreakInput] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
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
  );
};

const Create = ({ data }: { data: string }) => {
  const parsedData = JSON.parse(data) as Exercise[];

  const [title, setTitle] = useState('');
  const [userExercises, setUserExercises] = useState<Exercise[]>(parsedData);
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]);

  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Exercise[]>(userExercises);
  const [isFocused, setIsFocused] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  // FUNCTIONS

  const handleClick = () => {
    searchRef.current?.focus();
  };

  return (
    <div className="vertical-container">
      <input
        type="text"
        placeholder="Título Rutina"
        className="bg-transparent text-4xl text-center mt-24"
      />
      <SearchField
        ref={searchRef}
        setIsFocused={setIsFocused}
        setSearch={setSearch}
        className="mt-8"
        placeholder="Buscar Ejercicio"
      />

      <div className="element-list mt-12 relative">
        <span className="absolute font-semibold">
          {isFocused ? 'Tus Ejercicios:' : 'Ejercicios de Esta Rutina:'}
        </span>
        {isFocused ? (
          userExercises.map((e, i) => (
            <ListElement
              title={e.title}
              subtitle={`${e.bpm}bpm`}
              actionElement={<AddBtn />}
              deleteElement={<DeleteBtn id={e._id.toString()} setResult={setResult} />}
              key={i}
            />
          ))
        ) : workoutExercises.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <button onClick={handleClick} className="main small">
              Agregar Ejercicios
            </button>
          </div>
        ) : (
          workoutExercises.map((e, i) => (
            <ListElement
              title={e.title}
              subtitle={`${e.bpm}bpm`}
              actionElement={<AddBtn />}
              deleteElement={<DeleteBtn id={e._id.toString()} setResult={setResult} />}
              key={i}
            />
          ))
        )}
      </div>

      <div className="mt-12 mb-8">
        <BreakOptions />
        <button className="big main mt-4">Guardar</button>
      </div>
    </div>
  );
};

export default Create;
