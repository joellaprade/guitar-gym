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
  const formatVideoDataToClient = () => {
    if (!exercise?.video) return;
    console.log(exercise);
    const start = exercise.video.start;
    let link = 'https://www.youtube.com/watch?v=';
    let startMinute = Math.floor(start / 60);
    let startSecond = start - startMinute * 60;
    link += exercise.video.videoId;

    return { link, startMinute, startSecond };
  };
  const router = useRouter();
  const isEdit = exercise != undefined;

  const [title, setTitle] = useState(exercise?.title || 'Exercise');
  const [bpm, setBpm] = useState(exercise?.bpm || 120);
  const [timeSignature, setTimeSignature] = useState(exercise?.timeSignature || [4, 4]);
  const [measures, setMeasures] = useState(exercise?.measures || 32);
  const [description, setDescription] = useState(exercise?.description || '');
  const [video, setVideo] = useState(formatVideoDataToClient() ?? { link: '', startMinute: 0, startSecond: 0 });

  const { data, loading, runAction } = useFetchServerAction(isEdit ? updateExercise : saveExercise);

  const formatVideoDataToServer = () => {
    const videoId = new URL(video.link).searchParams.get('v');
    const start = video.startMinute * 60 + video.startSecond;

    return { videoId, start };
  };

  useEffect(() => {
    if (data) router.push('/exercises');
  }, [data]);

  return (
    <form
      className="scrollbar-none flex flex-grow flex-col overflow-y-scroll px-1 pb-1"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('video', JSON.stringify(formatVideoDataToServer()));
        runAction(formData);
      }}
    >
      <input readOnly className="hidden" type="text" name="id" value={exercise?.id} />
      <div className="my-auto flex flex-col gap-1.5">
        <div className="form-item">
          <label>Title</label>
          <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={selectOnFocus} />
        </div>
        <div className="form-item">
          <label>BPM</label>
          <input name="bpm" type="number" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} onFocus={selectOnFocus} />
        </div>
        <div className="form-item">
          <label>Time Signature</label>
          <div className="flex items-center gap-3">
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
        <div className="form-item">
          <label>Number of Measures</label>
          <input name="measures" type="number" value={measures} onChange={(e) => setMeasures(Number(e.target.value))} onFocus={selectOnFocus} />
        </div>
        <div className="form-item">
          <label>Description</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onFocus={selectOnFocus} />
        </div>

        <div className="form-item">
          <label>Video Link</label>
          <input
            name="video{}"
            type="text"
            value={video.link}
            onChange={(e) => setVideo((prev) => ({ ...prev, link: e.target.value }))}
            onFocus={selectOnFocus}
          />
        </div>

        <div className="form-item">
          <label>Video Start</label>
          <div className="flex gap-4">
            <input
              className="w-16"
              name="video{}"
              type="number"
              value={video.startMinute}
              onChange={(e) => setVideo((prev) => ({ ...prev, startMinute: Number(e.target.value) }))}
              onFocus={selectOnFocus}
            />
            <span className="text-4xl">:</span>

            <input
              className="w-16"
              name="video{}"
              type="number"
              value={video.startSecond}
              onChange={(e) => setVideo((prev) => ({ ...prev, startSecond: Number(e.target.value) }))}
              onFocus={selectOnFocus}
            />
          </div>
        </div>

        <div className="form-item flex flex-col gap-4">
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
