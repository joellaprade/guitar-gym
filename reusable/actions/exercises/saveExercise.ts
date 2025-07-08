'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/utils';
import { Exercise } from '../../models/Exercise';
import { Types } from 'mongoose';

type FormValues = {
  title: string;
  bpm: number;
  timeSignature: string;
  measures: number;
  keywords: string[];
};

export const saveExercise = async (formData: FormData) => {
  try {
    await db();

    const exercise = getFormValues<FormValues>(formData);
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get('userId')?.value;
    const userId = new Types.ObjectId(userIdCookie);

    if (!userId) return;

    await Exercise.create({ ...exercise, userId });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
