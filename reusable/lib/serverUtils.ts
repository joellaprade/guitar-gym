import { Query } from 'mongoose';
import { DBExercise, Exercise } from '../models/Exercise';
import { Workout } from '../models/Workout';

export function getFormValues<T extends Record<string, any>>(
  formData: FormData,
  stringifiedFields?: string[]
): T {
  const result: Record<string, any> = {};

  for (let [key, value] of formData.entries()) {
    // si tenemos que mandar un array desde el form
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      // si hay campos quese deben parse
      if (stringifiedFields && stringifiedFields.includes(cleanKey))
        value = JSON.parse(value as string);
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey].push(value);
    } else {
      if (stringifiedFields && stringifiedFields.includes(key)) value = JSON.parse(value as string);
      result[key] = value;
    }
  }

  return result as T;
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
    throw new Error('Couldnt execute query');
  }
};
export const populateWorkoutExercises = async (workout: Workout) => {
  const { exercises } = workout;
  for (let i = 0; i < exercises.length; i++) {
    const e = exercises[i];
    if (typeof e !== 'string') continue;
    const query = DBExercise.findById(e);
    const exercise = await docToObj<Exercise>(query);
    if (!exercise) continue;
    workout.exercises[i] = exercise;
  }

  return workout;
};
