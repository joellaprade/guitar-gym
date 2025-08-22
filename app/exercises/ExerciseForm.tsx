'use client';

import { saveExercise } from '@/reusable/actions/exercises/saveExercise';
import { updateExercise } from '@/reusable/actions/exercises/updateExercise';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import KeywordsField from './KeywordsField';
import { selectOnFocus } from '@/reusable/lib/clientUtils';
import { Exercise } from '@/reusable/models/Exercise';

const ExerciseForm = ({ exercise }: { exercise?: Exercise }) => {
  const router = useRouter();
  const isEdit = exercise != undefined;

  const [title, setTitle] = useState(exercise?.title || 'Exercise');
  const [bpm, setBpm] = useState(exercise?.bpm || 120);
  const [timeSignature, setTimeSignature] = useState(exercise?.timeSignature || [4, 4]);
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
          <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={selectOnFocus} />
        </div>
        <div className=" form-item">
          <label>BPM</label>
          <input name="bpm" type="number" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} onFocus={selectOnFocus} />
        </div>
        <div className=" form-item">
          <label>Time Signature</label>
          <div className="flex gap-3 items-center">
            <input
              className="w-12"
              name="timeSignature[]"
              type="number"
              value={timeSignature[0] ? timeSignature[0] : ''}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : 0;

                setTimeSignature([value, timeSignature[1]]);
              }}
              onFocus={selectOnFocus}
            />
            <span className="text-md">/</span>
            <input
              className="w-12"
              name="timeSignature[]"
              type="number"
              value={timeSignature[1] ? timeSignature[1] : ''}
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : 0;

                setTimeSignature([timeSignature[0], value]);
              }}
              onFocus={selectOnFocus}
            />
          </div>
        </div>
        <div className=" form-item">
          <label>Number of Measures</label>
          <input name="measures" type="number" value={measures} onChange={(e) => setMeasures(Number(e.target.value))} onFocus={selectOnFocus} />
        </div>
        <div className=" form-item">
          <label>Description</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onFocus={selectOnFocus} />
        </div>
        <div className="flex flex-col gap-4 form-item">
          <label>Keywords (optional)</label>
          <KeywordsField keywordsProp={exercise?.keywords} />
        </div>
      </div>
      <button type={`${loading ? 'button' : 'submit'}`} className={`big main mt-4 mb-8 ${loading ? 'opacity-50' : ''}`}>
        {loading ? 'Sending...' : 'Save'}
      </button>
    </form>
  );
};

export default ExerciseForm;
