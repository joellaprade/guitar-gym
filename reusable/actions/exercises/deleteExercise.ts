'use server';

import db from '@/reusable/lib/db';
import { DBExercise } from '@/reusable/models/Exercise';

export const deleteExercise = async (id: string) => {
  try {
    await db();
    await DBExercise.findByIdAndDelete(id);
  } catch (e) {
    throw new Error('No se pudo eliminar este ejercicio.');
  }
};
