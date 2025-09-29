import { formatTime } from '@/reusable/lib/clientUtils';
import { usePracticeContext } from '../../PracticeContext';
import { useMetronomeContext } from '../../MetronomeContext';
import PlayBtn from '@/reusable/components/ui/PlayBtn';
import { Gradient } from '@/reusable/components/Gradient';
import { useEffect, useRef, useState } from 'react';

const MetronomeCircle = () => {
  const { currentExercise, currentSecond, currentBeat } = usePracticeContext();
  const { isPlaying, color, toggleMetronome } = useMetronomeContext();
  const [pulse, setPulse] = useState(true);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const delay = 60000 / currentExercise.bpm - 100;
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, delay);
  }, [currentBeat]);
  useEffect(() => {
    if (audio.current && currentSecond === currentExercise.seconds) {
      toggleMetronome();

      audio.current.play().catch((err) => console.error('Failed to play sound', err));
    }
  }, [currentSecond]);
  useEffect(() => {
    audio.current = new Audio('/sound/bigClick.wav');
    audio.current.load();
  }, []);

  return (
    <div onClick={toggleMetronome} className={`play-btn relative transition-colors duration-1000`} style={{ backgroundColor: color }}>
      {isPlaying ? (
        <>
          {currentExercise.isTimeSelected ? (
            <h1 className="text-dark-gray text-8xl font-bold">{formatTime(currentSecond)}</h1>
          ) : (
            <div className="relative z-2 flex flex-col items-center justify-center">
              <h1 className="text-dark-gray text-8xl font-bold">{currentExercise.bpm}</h1>
              <h3 className="text-dark-gray absolute bottom-0 translate-y-[65%] text-3xl font-bold">bpm</h3>
            </div>
          )}
        </>
      ) : (
        <PlayBtn className="fill-dark-gray relative left-1.5 z-2 h-[35%] w-[35%]" />
      )}
      <Gradient />
      <div className={`pulse-effect`} style={{ animation: pulse ? `pulse ${60 / currentExercise.bpm}s ease-out` : '' }}></div>
    </div>
  );
};

export default MetronomeCircle;
