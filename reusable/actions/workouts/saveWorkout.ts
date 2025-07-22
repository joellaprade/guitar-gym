'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/utils';
import { Types } from 'mongoose';
import { DBWorkout } from '@/reusable/models/Workout';

type FormValues = {
  title: string;
  workoutExercises: string;
};

export const saveWorkout = async (formData: FormData) => {
  try {
    await db();

    console.log(formData);

    const workout = getFormValues<FormValues>(formData);
    console.log(workout);
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get('userId')?.value;
    if (!userIdCookie) return;

    const userId = new Types.ObjectId(userIdCookie);
    await DBWorkout.create({ ...workout, userId });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
