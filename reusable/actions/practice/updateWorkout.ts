'use server';

import { DBWorkout, Workout } from '@/reusable/models/Workout';

export default async function updateWorkout(workout: Workout) {
  try {
    console.log(workout);
    const workoutDB: DBWorkout | null = await DBWorkout.findById(workout.id);
    if (!workoutDB) throw new Error('Workout not found');

    workoutDB.exercises = workout.exercises;
    console.log(workoutDB.exercises);
    workoutDB.save();
  } catch (e) {
    console.error(e);
  }
}
