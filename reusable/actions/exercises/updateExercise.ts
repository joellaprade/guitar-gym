'use server';

import db from '../../lib/db';
import { getFormValues } from '../../lib/utils';
import { Exercise } from '../../models/Exercise';

type FormValues = {
  title: string;
  bpm: number;
  timeSignature: string;
  measures: number;
  keywords: string[];
  id: string;
};

export const updateExercise = async (formData: FormData) => {
  try {
    await db();

    const exercise = getFormValues<FormValues>(formData);

    await Exercise.findByIdAndUpdate(exercise.id, exercise);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
