'use client';

import { saveExercise } from '@/reusable/actions/exercises/saveExercise';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ExerciseForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState('Ejercicio');
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState('4 / 4');
  const [measures, setMeasures] = useState(32);
  const [keywords, setKeywords] = useState<string[]>(['']);

  const { data, loading, runAction } = useFetchServerAction(saveExercise);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeywords = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setKeywords((prevState) => {
      prevState[i] = e.target.value;
      if (e.target.value === '' && prevState.length > 1) prevState.splice(i, 1);
      return [...prevState];
    });
  };

  const handleExtraKeyword = () => {
    setKeywords((prevState) => ['', ...prevState]);
  };

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
      <div className="my-auto">
        <div>
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label>BPM</label>
          <input
            name="bpm"
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label>Time Signature</label>
          <input
            name="timeSignature"
            type="text"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label>Number of Measures</label>
          <input
            name="measures"
            type="number"
            value={measures}
            onChange={(e) => setMeasures(Number(e.target.value))}
            onFocus={handleFocus}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label>Keywords (optional)</label>
          <div className="vertical-container gap-4">
            {keywords.map((k, i) =>
              i === 0 ? (
                <div className="flex flex-row gap-4" key={0}>
                  <input
                    name="keywords[]"
                    className="flex-grow"
                    type="text"
                    value={k}
                    onChange={(e) => handleKeywords(e, i)}
                    onFocus={handleFocus}
                  />
                  <button
                    className="secondary small aspect-square h-full text-xl font-normal flex items-center justify-center"
                    type="button"
                    onClick={handleExtraKeyword}
                  >
                    +
                  </button>
                </div>
              ) : (
                <input
                  name="keywords[]"
                  className="flex-grow"
                  type="text"
                  value={k}
                  onChange={(e) => handleKeywords(e, i)}
                  onFocus={handleFocus}
                  key={i}
                />
              )
            )}
          </div>
        </div>
      </div>
      <button
        type={`${loading ? 'button' : 'submit'}`}
        className={`big main mb-8 ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Esperando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default ExerciseForm;
