import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Exercise } from '../models/Exercise';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const multiFetch = async <T>(
  server: 'express' | 'nextjs',
  url: string,
  reqType?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  bodyData?: object | FormData
): Promise<T> => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  let baseUrl = '';
  const isFormData = bodyData instanceof FormData;
  const body = bodyData ? (isFormData ? bodyData : JSON.stringify(bodyData)) : undefined;

  switch (server) {
    case 'express':
      baseUrl = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;
      break;
    case 'nextjs':
      baseUrl = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL!;
      break;
  }
  try {
    const res = await fetch(baseUrl + url, {
      method: reqType || 'GET',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body,
      credentials: 'include',
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err.err);
      throw new Error(`Couldn\'t fetch data boi: ${err.err}`);
    }

    return await res.json();
  } catch (e) {
    console.error(e);
    return {} as T;
  }
};
export const handleSearch = <T extends { title: string; keywords?: string[] }>(search: string, items: T[]) => {
  const lSearch = search.toLowerCase();

  if (lSearch === '') return items;

  return items.filter((item) => item.title.toLowerCase().includes(lSearch) || item.keywords?.some((kw) => kw.toLowerCase().includes(lSearch)));
};
export const getXYAllDevices = (e: MouseEvent | TouchEvent) => {
  let clientX: number, clientY: number;

  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  } else {
    throw new Error('Dispositivo no apto para scroll');
  }

  return { clientX, clientY };
};
export const selectOnFocus = (e?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  if (!e) {
    const input = document.querySelector('#workout-search-exercises-input') as HTMLInputElement;
    if (input) {
      input.focus();
      input.select();
    }
  } else {
    e.target.select();
  }
};
export const formatWorkoutExercisesToDB = (workoutExercises: Exercise[]) => {
  let formatedExercises: { _id: string; bpm: number }[] = [];

  formatedExercises = workoutExercises.map(({ id, bpm }) => ({ _id: id, bpm }));

  return formatedExercises;
};
export const formatTime = (time: number) => {
  let formattedTime = '';
  let hours;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    formattedTime += `${hours}:`;
  }

  if (minutes < 10) formattedTime += '0';
  formattedTime += `${minutes}:`;

  if (seconds < 10) formattedTime += '0';
  formattedTime += `${seconds}`;

  return formattedTime;
};
