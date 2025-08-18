'use client';
import { useState, useRef } from 'react';
import { MetronomeSound } from '../practice/MetronomeSound';

export default function MetronomeComponent() {
  const [tempo, setTempo] = useState(120);
  const metronomeRef = useRef<MetronomeSound | null>(null);

  const toggle = () => {
    if (!metronomeRef.current) {
      metronomeRef.current = new MetronomeSound(tempo, '/sound/smallClick.wav', () =>
        console.log('e')
      );
      metronomeRef.current.start();
    } else {
      metronomeRef.current.stop();
      metronomeRef.current = null;
    }
  };

  return (
    <div>
      <input
        type="number"
        value={tempo}
        onChange={(e) => {
          setTempo(Number(e.target.value));
          metronomeRef.current?.setTempo(Number(e.target.value));
        }}
      />
      <button onClick={toggle}>Start / Stop</button>
    </div>
  );
}
