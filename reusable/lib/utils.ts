import { clsx, type ClassValue } from 'clsx';
import { Query } from 'mongoose';
import { twMerge } from 'tailwind-merge';
import { Exercise } from '../models/Exercise';
import { Break } from '../models/Break';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormValues<T extends Record<string, any>>(
  formData: FormData,
  stringifiedFields?: string[]
): T {
  const result: Record<string, any> = {};

  for (let [key, value] of formData.entries()) {
    // si tenemos que mandar un array desde el form
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      // si hay campos quese deben parse
      if (stringifiedFields && stringifiedFields.includes(cleanKey))
        value = JSON.parse(value as string);
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey].push(value);
    } else {
      if (stringifiedFields && stringifiedFields.includes(key)) value = JSON.parse(value as string);
      result[key] = value;
    }
  }

  return result as T;
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

export const handleSearch = <T extends { title: string; keywords?: string[] }>(
  search: string,
  items: T[]
) => {
  const lSearch = search.toLowerCase();

  if (lSearch === '') return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lSearch) ||
      item.keywords?.some((kw) => kw.toLowerCase().includes(lSearch))
  );
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

export const docToObj = async <T>(query: Query<any, any, any, any>) => {
  const leanQuery = await query.lean();

  if (Array.isArray(leanQuery)) {
    return leanQuery.map((item: any) => {
      const id = item._id.toString();
      delete item._id;

      let obj = { ...item, id } as T;
      return obj;
    }) as T;
  } else {
    const id = leanQuery._id.toString();
    delete leanQuery._id;

    return { ...leanQuery, id } as T;
  }
};

export const selectOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.select();
};

export const formatWorkoutToDB = (workoutExercises: (Exercise | Break)[]) => {
  let formatedExercises: (string | Break)[] = [];

  formatedExercises = workoutExercises.map((e) => {
    if (e.isExercise) return e.id as string;
    else return e as Break;
  });

  return formatedExercises;
};
