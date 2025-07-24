'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/utils';
import { DBWorkout } from '@/reusable/models/Workout';

type FormValues = {
  title: string;
  exercises: string;
};

export const saveWorkout = async (formData: FormData) => {
  try {
    await db();

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return;

    const workout = getFormValues<FormValues>(formData, ['exercises']);
    await DBWorkout.create({ ...workout, userId });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
