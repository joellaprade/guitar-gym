'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBWorkout, Workout } from '@/reusable/models/Workout';

export const saveWorkout = async (formData: FormData) => {
  const cookieStore = await cookies();
  try {
    await db();

    const userId = cookieStore.get('userId')?.value;
    if (!userId) throw new Error('No user ID');

    const workout = getFormValues<Workout>(formData, ['exercises'], { userId });
    await DBWorkout.create(workout);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
