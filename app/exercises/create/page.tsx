'use client'; // Needed if you're using Next.js app router

import { useRef, useState } from 'react';
import BackArrow from '@/reusable/components/BackArrow';
import { Plus } from 'lucide-react';

const Create = () => {
  const keywordListRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState('Ejercicio');
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState('4 / 4');
  const [measures, setMeasures] = useState(32);
  const [keywords, setKeywords] = useState<string[]>(['']);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleKeywords = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();
    setKeywords((prevState) => {
      prevState[i] = e.target.value;
      return prevState;
    });
  };

  const handleExtraKeyword = () => {
    setKeywords((prevState) => ['', ...prevState]);
  };

  return (
    <>
      <BackArrow link="/exercises" />
      <div className="vertical-container">
        <h1 className="mt-24 mb-8">Crear Ejercicio</h1>
        <form className="flex flex-col gap-5 my-auto overflow-y-scroll scrollbar-none px-1 pb-1">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div>
            <label>BPM</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              onFocus={handleFocus}
            />
          </div>
          <div>
            <label>Time Signature</label>
            <input
              type="text"
              value={timeSignature}
              onChange={(e) => setTimeSignature(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div>
            <label>Number of Measures</label>
            <input
              type="number"
              value={measures}
              onChange={(e) => setMeasures(Number(e.target.value))}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label>Keywords (optional)</label>
            <div ref={keywordListRef} className="vertical-container gap-4">
              {keywords.map((k, i) =>
                i === 0 ? (
                  <div className="flex flex-row gap-4" key={0}>
                    <input
                      className="flex-grow"
                      type="text"
                      value={keywords[i]}
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
                    className="flex-grow"
                    type="text"
                    value={keywords[i]}
                    onChange={(e) => handleKeywords(e, i)}
                    onFocus={handleFocus}
                    key={i}
                  />
                )
              )}
            </div>
          </div>
        </form>
        <button className="big main my-8">Save</button>
      </div>
    </>
  );
};

export default Create;

/*



*/
