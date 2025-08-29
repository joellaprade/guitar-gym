'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBExercise, Exercise } from '../../models/Exercise';

export const saveExercise = async (formData: FormData) => {
  const cookieStore = await cookies();
  try {
    await db();

    const userId = cookieStore.get('userId')?.value;
    if (!userId) return;

    let exercise = getFormValues<Exercise>(formData, null, { userId });
    exercise.timeSignature = exercise.timeSignature.map((num) => Number(num));

    await DBExercise.create(exercise);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
