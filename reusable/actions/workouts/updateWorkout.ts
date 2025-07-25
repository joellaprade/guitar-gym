'use server';

import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBWorkout, Workout } from '../../models/Workout';

type FormValues = {
  title: string;
  exercises: string;
  id: string;
};

export const updateWorkout = async (formData: FormData) => {
  try {
    await db();

    const workout = getFormValues<FormValues>(formData, ['exercises']);
    await DBWorkout.findByIdAndUpdate(workout.id, workout);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
