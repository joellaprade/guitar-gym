'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBExercise, Exercise } from '../../models/Exercise';

export const updateExercise = async (formData: FormData) => {
  const cookieStore = await cookies();
  try {
    await db();

    const userId = cookieStore.get('userId')?.value;
    if (!userId) return false;

    const exercise = getFormValues<Exercise>(formData, null, { userId });
    await DBExercise.findByIdAndUpdate(exercise.id, exercise);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
