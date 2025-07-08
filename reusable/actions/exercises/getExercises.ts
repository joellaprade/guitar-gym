'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { Exercise } from '../../models/Exercise';

export const getExercises = async (id?: string) => {
  try {
    await db();
    let exercises: Exercise[] = [];

    if (id) {
      const exercise: Exercise | null = await Exercise.findById(id);
      if (!exercise) throw new Error('No se pudo obtener el ejercicio');
      exercises.push(exercise);
    } else {
      const cookieStore = await cookies();
      const userId = cookieStore.get('userId')?.value;
      exercises = await Exercise.find({ userId });
    }

    if (!exercises) throw new Error('No se pudieron obtener los ejercicios');

    return exercises;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
