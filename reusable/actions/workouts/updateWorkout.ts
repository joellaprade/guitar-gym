'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBWorkout, Workout } from '../../models/Workout';

export const updateWorkout = async (formData: FormData) => {
  const cookieStore = await cookies();
  try {
    await db();

    const userId = cookieStore.get('userId')?.value;
    if (!userId) return;

    const workout = getFormValues<Workout>(formData, ['exercises'], { userId });
    await DBWorkout.findByIdAndUpdate(workout.id, workout);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
