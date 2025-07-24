'use server';

import db from '../../lib/db';
import { getFormValues } from '../../lib/utils';
import { DBExercise } from '../../models/Exercise';

type FormValues = {
  title: string;
  bpm: number;
  timeSignature: string;
  measures: number;
  description: string;
  keywords: string[];
  id: string;
};

export const updateExercise = async (formData: FormData) => {
  try {
    await db();

    const exercise = getFormValues<FormValues>(formData);
    await DBExercise.findByIdAndUpdate(exercise.id, exercise);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
