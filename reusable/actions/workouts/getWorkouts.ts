'use server';

import { cookies } from 'next/headers';
import db from '../../lib/db';
import { docToObj } from '@/reusable/lib/utils';
import { DBWorkout, Workout } from '@/reusable/models/Workout';

export const getWorkouts = async (id?: string) => {
  try {
    await db();
    let workouts: Workout[] = [];

    if (id) {
      const query = DBWorkout.findById(id);
      const workout = await docToObj<Workout>(query);
      if (!workout) throw new Error('No se pudo obtener la rutina');
      workouts.push(workout);
    } else {
      const cookieStore = await cookies();
      const userId = cookieStore.get('userId')?.value;
      const query = DBWorkout.find({ userId });
      workouts = await docToObj<Workout[]>(query);
    }

    if (!workouts) throw new Error('No se pudieron obtener las rutinas');
    return workouts;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
