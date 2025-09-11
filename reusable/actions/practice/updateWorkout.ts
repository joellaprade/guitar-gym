'use server';

import db from '@/reusable/lib/db';
import { DBWorkout, Workout } from '@/reusable/models/Workout';

export default async function updateWorkout(workout: Workout) {
  try {
    await db();

    const workoutDB: DBWorkout | null = await DBWorkout.findById(workout.id);
    if (!workoutDB) throw new Error('Workout not found');

    workoutDB.exercises = workout.exercises;
    workoutDB.save();
  } catch (e) {
    console.error(e);
  }
}
