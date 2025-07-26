'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { getFormValues } from '../../lib/serverUtils';
import { DBExercise } from '../../models/Exercise';
import { Types } from 'mongoose';

type FormValues = {
  title: string;
  bpm: number;
  timeSignature: string;
  measures: number;
  description: string;
  keywords: string[];
};

export const saveExercise = async (formData: FormData) => {
  const cookieStore = await cookies();
  try {
    await db();

    const exercise = getFormValues<FormValues>(formData);
    const userIdCookie = cookieStore.get('userId')?.value;
    if (!userIdCookie) return;

    const userId = new Types.ObjectId(userIdCookie);
    await DBExercise.create({ ...exercise, userId });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
