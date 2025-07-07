'use server';

import { cookies } from 'next/headers';
import db from '../lib/db';
import { Exercice } from '../models/Exercice';

export const getExercices = async () => {
  await db();

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  const exercices = await Exercice.find({ userId });
  console.log(exercices);

  return exercices;
};
