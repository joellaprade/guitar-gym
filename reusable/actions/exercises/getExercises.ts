'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { DBExercise, Exercise } from '../../models/Exercise';
import { docToObj } from '@/reusable/lib/serverUtils';

export const getExercises = async (id?: string) => {
  try {
    await db();
    let exercises: Exercise[] = [];
    console.log('RAN exercises');
    console.warn('RAN exercises');
    if (id) {
      const query = DBExercise.findById(id);
      const exercise = await docToObj<Exercise>(query);
      if (!exercise) throw new Error('No se pudo obtener el ejercicio');

      exercises.push(exercise);
    } else {
      console.log('RAN exercises !id');
      console.warn('RAN exercises !id');
      const cookieStore = await cookies();
      console.log(cookieStore.getAll());
      const userId = cookieStore.get('userId')?.value;
      const query = DBExercise.find({ userId });
      exercises = await docToObj<Exercise[]>(query);
      console.log(exercises);
    }

    if (!exercises) throw new Error('No se pudieron obtener los ejercicios');
    return exercises;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
