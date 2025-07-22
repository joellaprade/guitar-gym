'use client';

import { saveExercise } from '@/reusable/actions/exercises/saveExercise';
import { updateExercise } from '@/reusable/actions/exercises/updateExercise';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import KeywordsField from './KeywordsField';
import { selectOnFocus } from '@/reusable/lib/utils';
import { Exercise } from '@/reusable/models/Exercise';

const ExerciseForm = ({ exercise }: { exercise?: Exercise }) => {
  const router = useRouter();
  const isEdit = exercise != undefined;

  const [title, setTitle] = useState(exercise?.title || 'Ejercicio');
  const [bpm, setBpm] = useState(exercise?.bpm || 120);
  const [timeSignature, setTimeSignature] = useState(exercise?.timeSignature || '4 / 4');
  const [measures, setMeasures] = useState(exercise?.measures || 32);
  const [description, setDescription] = useState(exercise?.description || '');

  const { data, loading, runAction } = useFetchServerAction(isEdit ? updateExercise : saveExercise);

  useEffect(() => {
    if (data) router.push('/exercises');
  }, [data]);

  return (
    <form
      className="flex flex-col flex-grow overflow-y-scroll scrollbar-none px-1 pb-1"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        runAction(formData);
      }}
    >
      <input readOnly className="hidden" type="text" name="id" value={exercise?.id} />
      <div className="my-auto flex flex-col gap-1.5">
        <div className="form-item">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={selectOnFocus}
          />
        </div>
        <div className=" form-item">
          <label>BPM</label>
          <input
            name="bpm"
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            onFocus={selectOnFocus}
          />
        </div>
        <div className=" form-item">
          <label>Time Signature</label>
          <input
            name="timeSignature"
            type="text"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            onFocus={selectOnFocus}
          />
        </div>
        <div className=" form-item">
          <label>Number of Measures</label>
          <input
            name="measures"
            type="number"
            value={measures}
            onChange={(e) => setMeasures(Number(e.target.value))}
            onFocus={selectOnFocus}
          />
        </div>
        <div className=" form-item">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={selectOnFocus}
          />
        </div>
        <div className="flex flex-col gap-4 form-item">
          <label>Keywords (optional)</label>
          <KeywordsField keywordsProp={exercise?.keywords} />
        </div>
      </div>
      <button
        type={`${loading ? 'button' : 'submit'}`}
        className={`big main mt-4 mb-8 ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Esperando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default ExerciseForm;
