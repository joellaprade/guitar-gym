'use server';

import { DBExercise } from '@/reusable/models/Exercise';
import { Workout } from '@/reusable/models/Workout';

export default async function saveWorkout(workout: Workout) {
  try {
    const queries = workout.exercises.map((e) => DBExercise.findByIdAndUpdate(e.id, e));
    await Promise.all(queries);
  } catch (e) {
    console.error(e);
  }
}
