'use server';

import { cookies } from 'next/headers';
import db from '../lib/db';
import { getFormValues } from '../lib/utils';
import { Exercice } from '../models/Exercice';
import { Types } from 'mongoose';

type FormValues = {
  title: string;
  bpm: number;
  timeSignature: string;
  measures: number;
  keywords: string[];
};

export const saveExercice = async (formData: FormData) => {
  try {
    await db();

    const exercice = getFormValues<FormValues>(formData);
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get('userId')?.value;
    const userId = new Types.ObjectId(userIdCookie);

    if (!userId) return;

    await Exercice.create({ ...exercice, userId });

    return true;
  } catch (e) {
    console.error(e);
    return 'Error agregando el ejercicio.';
  }
};
