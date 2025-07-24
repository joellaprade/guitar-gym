'use server';

import db from '@/reusable/lib/db';
import { DBWorkout } from '@/reusable/models/Workout';

export const deleteWorkout = async (id: string) => {
  try {
    await db();
    await DBWorkout.findByIdAndDelete(id);
  } catch (e) {
    throw new Error('No se pudo eliminar este ejercicio.');
  }
};
