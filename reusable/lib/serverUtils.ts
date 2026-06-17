import { Query } from 'mongoose';
import { DBExercise, Exercise } from '../models/Exercise';
import { DBWorkout, Workout } from '../models/Workout';

export function getFormValues<T>(formData: FormData, stringifiedFields?: string[] | null, missingValues?: Record<string, any>): T {
  const result: Record<string, any> = {};

  for (let [key, value] of formData.entries()) {
    // si tenemos que mandar un array desde el form
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      // si hay campos quese deben parse
      if (stringifiedFields && stringifiedFields.includes(cleanKey)) value = JSON.parse(value as string);
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey].push(value);
    } else if (key.endsWith('{}')) {
    } else {
      if (stringifiedFields && stringifiedFields.includes(key)) value = JSON.parse(value as string);
      result[key] = value;
    }
  }

  return { ...result, ...missingValues } as T;
}
export const docToObj = async <T>(query: Query<any, any, any, any>, missingValues?: Record<string, any>) => {
  const leanQuery = await query.lean();

  try {
    if (Array.isArray(leanQuery)) {
      return leanQuery.map((item: any) => {
        const id = item._id.toString();
        delete item._id;

        let obj = { ...item, id } as T;
        return obj;
      }) as T;
    } else {
      const id = leanQuery._id.toString();
      delete leanQuery._id;

      return { ...leanQuery, id, ...missingValues } as T;
    }
  } catch (e) {
    console.error('Couldnt execute query');
    console.error(e);
    return null;
  }
};
/**
 * Populate exercises for one or more workouts using a single batched DB query
 * instead of individual findById calls per exercise.
 *
 * Also cleans up references to deleted exercises in bulk.
 */
export const populateWorkoutExercises = async <T>(workoutOrWorkouts: any): Promise<T> => {
  const isSingle = !Array.isArray(workoutOrWorkouts);
  let workouts: any[] = isSingle ? [workoutOrWorkouts] : workoutOrWorkouts;

  // 1. Collect all unique exercise IDs across all workouts
  const exerciseEntries: { _id: any; bpm: number }[] = workouts.flatMap((w) => w.exercises);
  const uniqueIds = [...new Set(exerciseEntries.map((e) => e._id.toString()))];

  if (uniqueIds.length === 0) return (isSingle ? workouts[0] : workouts) as T;

  // 2. Single batched query for all exercises
  const docs: any[] = await DBExercise.find({ _id: { $in: uniqueIds } }).lean();

  // 3. Build a lookup map: id string → exercise plain object
  const exerciseMap = new Map<string, any>();
  for (const doc of docs) {
    const id = doc._id.toString();
    const { _id, ...rest } = doc;
    exerciseMap.set(id, { ...rest, id });
  }

  // 4. Map exercises back onto each workout and track deleted references
  const deletedRefs: { workoutId: string; exerciseId: string }[] = [];

  for (const workout of workouts) {
    const populated: any[] = [];
    for (const entry of workout.exercises) {
      const id = entry._id?.toString?.() ?? entry.id;
      const exercise = exerciseMap.get(id);

      if (!exercise) {
        // Exercise was deleted from DB — mark for cleanup
        deletedRefs.push({ workoutId: workout.id, exerciseId: id });
        continue;
      }

      populated.push({ ...exercise, bpm: entry.bpm });
    }
    workout.exercises = populated;
  }

  // 5. Batch-cleanup deleted exercise references (if any)
  if (deletedRefs.length > 0) {
    const bulkOps = new Map<string, string[]>();
    for (const { workoutId, exerciseId } of deletedRefs) {
      if (!bulkOps.has(workoutId)) bulkOps.set(workoutId, []);
      bulkOps.get(workoutId)!.push(exerciseId);
    }

    await Promise.all(
      [...bulkOps.entries()].map(([workoutId, ids]) =>
        DBWorkout.updateOne({ _id: workoutId }, { $pull: { exercises: { _id: { $in: ids } } } })
      )
    );
  }

  return (isSingle ? workouts[0] : workouts) as T;
};
