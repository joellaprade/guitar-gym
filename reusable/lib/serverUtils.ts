import { Query } from 'mongoose';
import { DBWorkout, Workout } from '../models/Workout';

export function getFormValues<T>(formData: FormData, stringifiedFields?: string[] | null, missingValues?: Record<string, any>): T {
  const result: Record<string, any> = {};

  for (let [key, value] of formData.entries()) {
    // si tenemos que mandar un array desde el form
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      // si hay campos que se deben parse
      if (stringifiedFields && stringifiedFields.includes(cleanKey)) value = JSON.parse(value as string);
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey].push(value);
    } else {
      if (stringifiedFields && stringifiedFields.includes(key)) value = JSON.parse(value as string);
      result[key] = value;
    }
  }

  return { ...result, ...missingValues } as T;
}
export const docToObj = async <T>(query: Query<any, any, any, any>) => {
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

      return { ...leanQuery, id } as T;
    }
  } catch (e) {
    console.error('Couldnt execute query');
    console.error(e);
    return null;
  }
};
const removeDeletedExercises = async (workout: Workout, exerciseId: string) => {
  const workoutDoc: DBWorkout | null = await DBWorkout.findById(workout.id);
  if (!workoutDoc) return workout;

  let { exercises } = workoutDoc;

  exercises = exercises.filter((e) => e !== exerciseId);
  workoutDoc.exercises = exercises;
  workout.exercises = exercises;
  await workoutDoc.save();

  return workout;
};
